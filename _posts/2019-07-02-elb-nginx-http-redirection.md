---
title:  "ELB (Elastic Load Balancer) 환경에서 nginx 의 http to https redirection"
excerpt: ""
author: dpTablo

categories:
- AWS
- nginx
- http


tags:
- AWS
- ELB
- nginx
- http
- https
- redirection

date: 2019-07-02 19:56:00 +0900
last_modified_at: 2019-07-02 19:56:00 +0900
---

아마존 AWS 의 SSL 을 사용하고 ELB(Elastic Load Balancer) 를 사용하고 있다면 일반적으로 아래와 같은 상황일 것입니다.

http://[service domain] -> ELB 80 port -> EC2 80 port (nginx) -> service application (8080 port)

https://[service domain] -> ELB 443 port -> EC2 80 port (nginx) -> service application (8080 port)



저의 경우에는 EC2 에 Ubuntu Server 16.04 LTS 를 사용하였으며 service application 으로는 Spring boot 8080 port로 서비스 되고 있는 상태였습니다.

ELB 가 80/443 port 를 각각 listening 하게 되며 실제 서비스가 되고 있는 Ubuntu 쪽에서는 80 port 만 inbound 되고 있는 것이지요.

실질적으로 nginx 입장에서는 SSL 설정이 없는 것입니다.

X-Forwarded 관련 request header 를 설정하여 ELB 를 통해서 nginx 에 request 가 전송되었을 때 정보를 전달하여 이를 이용한 http 요청을 https 로 redirect 합니다.



[AWS 참고문서 - HTTP 헤더 및 Classic Load Balancer]

https://docs.aws.amazon.com/ko_kr/elasticloadbalancing/latest/classic/x-forwarded-headers.html



아래는 nginx 에 설정한 내용입니다.

nginx 설치 경로의 sites-enabled 경로에 configure 설정을 추가합니다.

http://[service domain]/test 로 접속하게 되면 proxy_set_header 설정에 의해 ELB 에서 nginx 로 request 가 전달될 때 header 값이 전달됩니다.


```
server { 
    # NGINX will listen on port 80 for both IP V4 and V6 
    listen 80; 
    listen [::]:80; 
    
    # Here we should specify the name of server 
    server_name test.com; 
    
    # Requests to given location will be redirected 
    location /test { 
        # NGINX will pass all requests to specified location here 
        proxy_pass http://localhost:8080/test;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for; 
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header X-Forwarded-Port $server_port; 
    } 
    
    if ($http_x_forwarded_proto = 'http') { 
        return 301 https://$host$request_uri; 
        } 
    }
```

$http_x_forwarded_proto 값을 if 문으로 체크하여 http 프로토콜로 request 가 전달된 경우에 HTTP 301 상태 값으로 redirect 하게 됩니다.