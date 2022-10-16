---
title:  "Richardson 성숙도 모델 - REST 성숙 모델"
excerpt: "REST 접근 방식에 대한 주요 요소에 대한 분류 모델"
author_profile: true
date: 2022-10-17 00:12:00 +0900
last_modified_at: 2022-10-17 00:12:00 +0900

categories:
- http
- web
- rest

tags: [http, web, rest, restful, maturity model, 성숙 모델, 성숙도, api]
---
Leonard Richardson 이 정의한 REST 접근 방식에 대한 주요 요소를 0레벨부터 3벨까지 4가지로 정의한 것을 말합니다.

3가지 요소들에 대해 더 많이 더 성숙한 것으로 간주합니다.
- URI
- HTTP Method
- HATEOAS (hypermedia)

# 0레벨
> 성숙도 0레벨은 URI, HTTP Method, HATEOAS 를 사용하지 않습니다.

성숙도가 0레벨인 서비스는 단일 URI를 가지며 단일 method를 사용합니다.

일반적으로 SOAP 웹서비스는 단일 URI를 사용하여 식별하고 POST method를 사용하여 SOAP 기반 페이로드를 전송합니다. 전송되는 데이터는 순서 XML 데이터로 전달합니다.

```bash
POST /Quotation HTTP/1.0
Host: www.xyz.org
Content-Type: text/xml; charset = utf-8
Content-Length: nnn

<?xml version = "1.0"?>
<SOAP-ENV:Envelope
   xmlns:SOAP-ENV = "http://www.w3.org/2001/12/soap-envelope"
   SOAP-ENV:encodingStyle = "http://www.w3.org/2001/12/soap-encoding">

   <SOAP-ENV:Body xmlns:m = "http://www.xyz.org/quotations">
      <m:GetQuotation>
         <m:QuotationsName>MiscroSoft</m:QuotationsName>
      </m:GetQuotation>
   </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
```

# 1레벨
> 성숙도 1레벨은 여러 URI를 사용하지만 HTTP method와 HATEOAS는 사용하지 않습니다.

성숙도 1레벨의 서비스는 여러 URI를 사용하지지만 일반적으로 HTTP method는 POST만을 사용합니다(단일 method 사용).

1레벨 서비스는 시스템에서 사용 가능한 각 리소스에 고유한 URI를 제공하고, 고유한 URI는 하나의 고유한 리소스를 개별적으로 식별하여 0레벨보다 우수합니다.
```bash
POST /api/users/update

{
    "userNumber": 200,
    "userId": 'dpTablo',
    "name": "타블로"
}
```

# 2레벨
> 성숙도 2레벨은 여러 URI와 HTTP method를 사용하지만 HATEOAS는 사용하지 않습니다.

2레벨 서비스는 일반적으로 주소 지정 가능한 리소스와 같은 수많은 URI를 호스트합니다.

이러한 서비스는 각 리소스에서 CRUD와 같은 여러 HTTP method를 지원합니다. 2레벨 서비스를 정의한 개발자는 사람들이 일반적으로 제공된 문서를 읽고 API를 사용하는 것에 대해 어려움이 없을 것을 기대합니다.

2레벨 준은 REST 원칙의 가장 인기 있는 사용 사례입니다.
```bash
CREATE POST /api/users
READ GET /api/users/200
UPDATE PUT /api/users/200
DELETE DELETE /api/users/200
```

# 3레벨
> 성숙도 3레벨은 여러 URI, Http method를 사용하고 HATEOAS도 사용합니다.

Richardson 성숙도 모델의 가장 성숙한 레벨이며 쉽게 검색하고 사용할 수 있습니다. 3레벨은 HATEOAS를 사용하여 response가 자기 설명적(self-descriptive)이게 됩니다.

3레벨 서비스는 리소스 추적을 통해 서비스를 사용하는 소비자를 안내하여 어플리케이션에 대한 상태 전환을 유도합니다.
```bash
HTTP/1.1 200 OK
Content-Type: application/json
{
    "result" {
        "userNumber": 200,    
        "id": "dpTablo",
        "name": "타블로",
        "nextActions": {
            "/api/users/{userId}/roles",
        }
    }
}
```