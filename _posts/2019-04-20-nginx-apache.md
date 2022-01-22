---
title:  "Nginx vs Apache"
excerpt: "nginx 와 apache 의 비교"
author_profile: true
date: 2019-04-20 10:07:00 +0900
last_modified_at: 2022-01-22 12:30:00 +0900

categories:
- web server
- nginx
- apache

tags: [web, web server, nginx, apache]
---

Nginx 와 Apache의 주요 차이점은 설계 아키텍처 있습니다. Apache 는 프로세스 중심 접근 방식을 사용하고 각각의 요청에 대해 새로운 스레드를 생성합니다. Nginx 는 이벤트 기반 아키텍처를 사용하여 하나의 스레드 내에서 여러 요청을 처리합니다.
<br>

# 아키텍처
## Apache
Apache 는 다중 스레드 접근 방식을 따르며, 여러 MPM(Multi-Processing Modules)이 있습니다. 세가지 주요 MPM 이 있습니다.

1. PreForm MPM
    - 요청에 대해 하나의 자식 프로세스를 생성하고, 이 프로세스는 하나의 스레드를 가지는 구조. 
    - 최대 1024개의 자식 프로세스를 생성 가능
    - 스레드 간 메모리 공유를 하지 않음
2. Worker MPM
   - 하나의 자식 프로세스마다 최대 64개의 스레드를 가지며, 각 스레드는 한번에 한 연결을 담당하는 구조.
   - 스레드 간 메모리 공유
3. Event MPM
   - Worker 방식에서 자식 프로세스와 그에 연결된 스레드의 작업을 부모 프로세스가 관리하는 구조.
   - 연결이 열려 있다가 아무런 이벤트가 일어나지 않으면 닫힘 (keep-alive)

## Nginx
Nginx 는 이벤트 기반 아키텍처를 사용하고 요청을 비동기적으로 처리합니다.

Non-Blocking event-diven 연결 알고리즘으로 설계 되었습니다. 프로세스는 하나의 처리 스레드 내에서 수천 개의 연결을 처리할 수 있습니다. 경량 구조로 Apache 에 비해 적은 리소스를 사용하는 빠른 아키텍처 입니다.


# 분산/중앙 집중식 구성

Apache 는 .htaccess 파일을 통해 디렉토리별로 설정을 변경할 수 있습니다.
Nginx 는 디렉토리 구성을 허용하지 않습니다.


# Request 해석

## Apache
요청을 파일 시스템 위치의 물리적 리소스로 전달합니다. 

Apache 는 URI 위치를 사용하지만 일반적으로는 더 추상적인 리소스를 위한 것입니다. 가상 호스트를 생성하거나 구성하는 동안 DocumentRoot 아래에 디렉토리 블록을 사용합니다.
```xml
<VirtualHost *:80>
  DocumentRoot "/home/web1"
  ServerName "site1.com"

  <directory "/home/web1">
    Options Indexes FollowSymLinks
  </directory>
</VirtualHost>
```

## Nginx
Nginx 는 웹서버이자 리버스 프록시 서버로 만들어졌습니다. 구성을 지정하는 메커니즘을 제공하지 않습니다. 파일 시스템 디렉토리의 경우 대신 URI 자체를 전달합니다. 요청을 파일 시스템 위치 대신 URI로 전달하면 Nginx가 웹, 프록시 서버 모두에서 쉽게 동작할 수 있습니다.
```shell
server {
  listen 80;
  server_name site1.com
  
  root /home/web1
  index index.html;
  
  location / {
    try_files $uri $uri/ /index.html
  }
}
```

요청을 URI 위치로 해석하는 방식으로 Nginx 는 웹서버 뿐만 아니라 프록시 서버, 로드 밸런서, HTTP 캐시로도 쉽게 사용할 수 있습니다.


# 기능 모듈

Apache 는 많은 공식 모듈을 제공하며 모듈을 동적으로 로드하거거나 언로드할 수 있습니다.

Nginx 는 서드파티 플러그인 형태로 선택되어 컴파일 됩니다.   


# 정리

Apache 는 오랜기간 사용되어 왔고 안정성, 확장성, 유연성이 장점이고, Nginx 는 경량의 빠른 속도가 장점입니다.

개인적인 추가의견으로 서버 설정에 관한 부분에 있어서 Nginx 가 좀더 편하다고 생각합니다. 
마치 Maven 와 Gradle 처럼 XML와 유사한 형태보다는 mustache 방식이 더 작성하기 편하고 가독성이 좋다는 느낌이 듭니다.


