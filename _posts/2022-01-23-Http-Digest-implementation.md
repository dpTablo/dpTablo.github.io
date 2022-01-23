---
title:  "Http Digest"
excerpt: "Servlet Container의 Http Digest 인증 처리에 대한 설명과 구현"
author_profile: true
date: 2022-01-23 21:30:00 +0900
last_modified_at: 2022-01-23 21:30:00 +0900

categories:
- servlet container
- authorization
- http

tags: [http, http digest, servlet container, authorization]
---

Http Digest 인증 방식에 대한 기초설명과 Servlet Container 에서의 인증 처리에 대한 구현예제 입니다. 

구현된 코드는 Github 저장소에 있습니다. 
[https://github.com/dpTablo/http-digest](https://github.com/dpTablo/http-digest)

# 개요

서버와 클라이언트간에 인증정보(계정, 암호) 원문을 주고받지 않고, 해시 알고리즘에 의해 생성된 메세지 다이제스트를 request / response 의 헤더를 주고받는 인증 방식.

```bash
Authroization: Digest username="reader",realm="Webtext",nonce="4k24kfi2043lsx",uri="/webtext/jamie/",cnonce="3k2jdir90wkgvnrk2ld9f023orj428gd",nc=000000001,responce="2lkd9fjdke92k459gkjdfg9432",qop="auth",opaque="fkjl2l34jkljdfklasdf92352d9"
```

## 장점
- nonce 를 이용한 [replay attack](https://en.wikipedia.org/wiki/Replay_attack) 방지 (유효한 요청을 악의적으로 반복하는 공격)
- [Phishing](https://en.wikipedia.org/wiki/Phishing) 공격 방지 (패스워드 원문이 정확하게 서버로 전송되지 않음)
- CPA([https://en.wikipedia.org/wiki/Chosen-plaintext_attack](https://en.wikipedia.org/wiki/Chosen-plaintext_attack)) 공격 방지
(공격자가 임의의 일반 텍스트에 대한 암호를 얻을 수 있다고 가정하는 암호화 분석을 위한 공격 모델)


## 단점

- [Man-in-the-middle attack](https://en.wikipedia.org/wiki/Man-in-the-middle_attack) 에 취약
(공격자가 클라이언트에게 기본 액세스 인증 또는 RFC 2069 다이제스트 액세스 인증 모드를 사용하도록 변조, Http Digest 인증은 서버의 ID 를 확인하는 매커니즘이 없음)
- HA1 문자열 자체가 유출되면 쉽게 인증할 수 있음. (HA1 해시 테이블을 사용할 경우 보호 필요)
- 암호 자체에 해시 알고리즘(MD5, SHA-256, SHA-512)을 사용하게 되어 보다 강력한 암호화 알고리즘을 사용할 수 없음.

# 일반적인 인증 흐름

일반적인 Http Digest 인증방식 케이스는 아래와 같다.

- 비세션 방식의 MD5 알고리즘
- qop : "auth"

1. 클라이언트가 서버에게 리소스를 요청한다.
2. 요청된 리소스가 인증이 필요한 리소에 해당한다. 서버는 클라이언트에게 WWW-Authenticate 헤더를 통해 인증 필요성을 클라이언트에게 전달한다.
    - nonce : 클라이언트가 서버에게 리소스를 요청할 때마다 서버에서 생성하는 임의의 값.
3. 인증 요청을 받은 클라이언트는 서버로부터 받은 nonce, qop, realm 속성 값을 Authorization 헤더에 그대로 추가하고 그 외의 필요한 속성값들을 추가한다.
    - nc : 클라이언트가 서버로부터 받은 nonce 를 이용하여 Server에게 몇번 요청했는지를 나타낸다.
    - cnonce : 클라이언트에서 생성하는 임의의 값.
    - response : 인증에 필요한 digest
<br>
```bash
HA1 = MD5(username:realm:password)
HA2 = MD5(method:uri)
response = MD5(HA1:nonce:nc:cnonce:qop:HA2)
```
<br>
5. 서버는 nonce 와 response 의 일치를 확인한다. 인증된 경우 클라이언트가 요청한 리소스와 함께 Authorization-Info 헤더를 통해 인증 정보를 전송한다.
    - nc 와 cnonce는 client 에서 보낸 값과 일치해야 한다.
    - rspauth 는 response auth 를 의미. 서버와 클라이언트 상호 인증시 이용.
    - nextnonce 는 클라이언트가 서버에게 다음 요청시 사용되길 원하는 nonce 값을 나타낸다.


![원문 : https://ssup2.github.io/theory_analysis/HTTP_Digest_인증]({{ site.url }}{{ site.baseurl }}/assets/images/posts/Http-Digest-implementation/http_digest_flow.png)

<center><b>(원문 : https://ssup2.github.io/theory_analysis/HTTP_Digest_인증)</b></center>

# 주요 기능분류

## 옵션에 대한 기능 분류

- Http Digest Algorithm 에 대한 해시 알고리즘
    - MD5
    - SHA256
    - SHA512
- Http Digest Algorithm 의 비세션 변형과 세션 변형("-sess")에 대한 처리
- QOP 에 따른 필드값 생성 처리 분기
    - auth
    - auth-int
- stale
- opaque

## 헤더 처리에 대한 기능 분류

- 서버의 "WWW-Authenticate" 헤더 출력
- 서버의 "Authentication-Info" 헤더 출력
- 서버의 "Proxy-Authentication-Info" 헤더 출력
- 클라이언트로부터 받은 "Authorization" 헤더 정보 분석

# 특이사항

## 클라이언트에서 미구현되어 테스트를 수행하지 못한 기능 있음

- RFC 표준문서에는 추가된 내용이나 실제로 클라이언트(브라우저)에서 지원하지 않아 테스트 수행 불가.

## stale 옵션과 서버의 "Authentication-Info" 헤더를 이용한 로직 미구현

- stale 옵션에 대한 분석 미흡.
- 어떠한 경우에 Authentication-Info 헤더가 출력되는가에 대한 케이스 분석 필요 .

  (예: nextnonce 속성을 이용하여 nonce 갱신하기 위한 처리와 상황, stale 속성이 true 일때 nextnonce 속성 출력)

- [replay attack](https://en.wikipedia.org/wiki/Replay_attack) 을 방지하기 위한 매커니즘으로 예상.
- tomcat 에서 해당 헤더가 출력되는 케이스를 테스트 해보려 하였으나 출력되지 않음.

## 서버의 "Proxy-Authentication-Info" 헤더 출력 미구현

- 분석 미흡

## apache tomcat, jetty 9.x 의 구현

- 해시 알고리즘은 MD5 로 고정 구현되어 있음
- qop 값은 'quth' 고정으로 처리하도록 되어 있음

tomcat 구현
[https://github.com/apache/tomcat/blob/9.0.x/java/org/apache/catalina/authenticator/DigestAuthenticator.java](https://github.com/apache/tomcat/blob/9.0.x/java/org/apache/catalina/authenticator/DigestAuthenticator.java)

jetty 구현
[https://github.com/eclipse/jetty.project/blob/jetty-10.0.x/jetty-security/src/main/java/org/eclipse/jetty/security/authentication/DigestAuthenticator.java](https://github.com/eclipse/jetty.project/blob/jetty-10.0.x/jetty-security/src/main/java/org/eclipse/jetty/security/authentication/DigestAuthenticator.java)

# 이슈사항

## 이슈1 - QOP 속성에 대한 클라이언트 동작 이상

서버에서 response 에 Www-Authenticate 헤더의 qop 속성으로 지원 가능한 보호 품질 값(auth or auth-int) 을 설정하여 전송.

이후 클라이언트에서 request 에 Authorization 헤더에 자신이 메세지 구성에 적용한 보호 품질 값을 전송해야 함.

macOS 기준 chrome, firefox, safari, edge 브라우저를 통해 테스트 수행 후 결과는 아래와 같음

- 서버에서 "auth" 를 전송한 경우에는 클라이언트로부터 qop 값이 "auth" 올바르게 전송
- 서버에서  "auth-int" 를 전송한 경우에는 qop 값이 누락되어 전송

## 이슈2 - SHA-256, SHA-512 지원에 대하여

위키피디아 내용 발췌

> 2015년 9월에 RFC 7616은 "SHA-256", "SHA-256-sess", "SHA-512" 및 "SHA-512-sess"라는 4가지 새로운 알고리즘을 추가하여 RFC 2617을 대체했습니다. 인코딩은 "MD5" 및 "MD5-sess" 알고리즘과 동일하며 MD5 해싱 기능이 SHA-256 및 SHA-512로 대체되었습니다. 그러나 2021년 7월 현재 Firefox 및 Chrome을 포함한 인기 있는 브라우저는 SHA-256을 해시 함수로 지원하지 않습니다.
>

firefox : [https://bugzilla.mozilla.org/show_bug.cgi?id=472823](https://bugzilla.mozilla.org/show_bug.cgi?id=472823)

chrome : [https://bugs.chromium.org/p/chromium/issues/detail?id=1160478](https://bugs.chromium.org/p/chromium/issues/detail?id=1160478)

브라우저의 Www-Authenticate 헤더 지원 여부에 대한 문서는 발견하지 못함.

가장 최신의 브라우저 버전으로 SHA-256과 SHA-512 를 테스트 해본 결과는 아래와 같음.

- Firefox 93.0 (macOS) : SHA-256  지원, SHA-512 미지원
- Edge 94.0.992.47 (macOS) : 모두 미지원
- Chrome 94.0.4606.81 (macOS) : 모두 미지원

# 참고

## RFC 원문링크

[RFC 2617](https://datatracker.ietf.org/doc/html/rfc2617)

## 학습참고 링크

- [MDN - Authorization](https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Authorization)
- [MDN WWW-Authenticate](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate)
- [Digest access authentication - Wikipedia](https://en.wikipedia.org/wiki/Digest_access_authentication)
- [HTTP Digest 인증](https://ssup2.github.io/theory_analysis/HTTP_Digest_인증/)
- [다이제스트 인증 (1) - 다이제스트 인증과 특징](https://feel5ny.github.io/2019/11/24/HTTP_013_01/)