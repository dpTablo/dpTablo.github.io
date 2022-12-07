---
title:  "Spring Framework 6.x 변경사항"
excerpt: "Spring Framework 6.x 변경사항들에 대한 원문 문서를 번역한 내용입니다."
author_profile: true
date: 2022-12-07 09:20 +0900
last_modified_at: 2022-12-07 09:20 +0900

categories:
- spring
- spring framework

tags: [spring, spring framework, spring 6.0, spring framework 6.0, jakarta]
---

원본문서 : [https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x)

### JDK 17+ and Jakarta EE 9+ Baseline

- 이제 Java 17 소스 코드 수준을 기반으로 하는 전체 프레임워크 코드베이스 입니다.
- Servlet, JPA 등을 위해 javax에서 jakarta 네임스페이스로 마이그레이션
- Jakarta EE 9 및 Jakarta EE 10 API와의 런타임 호환성
- 최신 웹 서버와 호환 : [Tomcat 10.1](https://tomcat.apache.org/whichversion.html), [Jetty 11](https://www.eclipse.org/jetty/download.php), [Undertow 2.3](https://github.com/undertow-io/undertow).
- [virtual threads](https://spring.io/blog/2022/10/11/embracing-virtual-threads) 와의 초기 호환성 (in preview as of JDK 19).

### 일반 핵심 개정

- ASM 9.4 및 Kotlin 1.7으로 업그레이드 합니다.
- CGLIB 생성 클래스 캡처를 지원하는 완전한 CGLIB 포크.
- AOT([Ahead-Of-Time transformations](https://spring.io/blog/2022/03/22/initial-aot-support-in-spring-framework-6-0-0-m3)) 을 위한 포괄적인 기반
- [GraalVM](https://www.graalvm.org/) 네이티브 이미지에 대한 최고 수준의 지원 ([related Spring Boot 3 blog post](https://spring.io/blog/2022/09/26/native-support-in-spring-boot-3-0-0-m5) 참조).

### Core Container

- 기본적으로 `java.beans.Introspector`가 없는 기본 빈 속성 결정.
- `GenericApplicationContext`(`refreshForAotProcessing`)에서 AOT 처리 지원
- Bean definition transformation based on pre-resolved constructors and factory methods.
- pre-resolved 생성된 팩토리 메서드를 bean 정의 변환.
- AOP 프록시 및 configuration 클래스에 대한 초기 프록시 클래스 결정 지원.
- `PathMatchingResourcePatternResolver`는 스캔에 NIO 및 module path API를 사용하여 각각 GraalVM 네이티브 이미지 및 Java 모듈 경로 내에서 classpath 스캔을 지원합니다.
- `DefaultFormattingConversionService`는 ISO 기반 기본 `java.time` 유형 구문 분석을 지원합니다.

### Data Access and Transactions

- 사전 결정된 JPA 관리 유형 지원(AOT 처리에 포함).
- [Hibernate ORM 6.1](https://hibernate.org/orm/releases/6.1/) 에 대한 JPA 지원 (Hibernate ORM 5.6과의 호환성 유지).
- [R2DBC 1.0](https://r2dbc.io/) 으로 업그레이드 (R2DBC 트랜잭션 정의 포함).
- JCA CCI 지원 제거.

### Spring Messaging

- [RSocket interface client](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/web-reactive.html#rsocket-interface) 는 `@RSocketExchange` 서비스 인터페이스를 기반으로 합니다.
- [Netty 5](https://netty.io/wiki/new-and-noteworthy-in-5.0.html) alpha 를 기반으로 한 Reactor Netty 2에 대한 조기 지원
- Jakarta WebSocket 2.1 및 표준 WebSocket 프로토콜 업그레이드 메커니즘을 지원합니다.

### 일반 Web 개정

- [HTTP interface client](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/integration.html#rest-http-interface) 는`@HttpExchange`  서비스 인터페이스를 기반으로 합니다..
- [RFC 7807 problem details](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/web.html#mvc-ann-rest-exceptions) 에 대한 지원.
- 통합 HTTP status code handling.
- Jackson 2.14에 대한 지원.
- Servlet 6.0과의 정렬 (Servlet 5.0과의 런타임 호환성을 유지하면서).

### Spring MVC

- `PathPatternParser` used by default (with the ability to opt into `PathMatcher`).
- 기본적으로 사용되는 `PathPatternParser` . (`PathMatcher` 를 선택하는 기능 포함)
- outdated Tiles 과 FreeMarker JSP 지원.

### Spring WebFlux

- multipart form upload를 스트리밍하는 새로운 `PartEvent`  API ( [client](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/web-reactive.html#partevent-2)와 [server](https://docs.spring.io/spring-framework/docs/6.0.0-RC1/reference/html/web-reactive.html#partevent) 모두).
- WebFlux Exceptions를 커스터마이징하고 RFC 7807 error response을 렌더링하는 새로운 `ResponseEntityExceptionHandler`
- 비스트리밍 미디어 유형에 대한 Flux return value (더 이상 작성하기 전에 `List`에 수집되지 않음).
- [Netty 5](https://netty.io/wiki/new-and-noteworthy-in-5.0.html) alpha 를 기반으로 한 Reactor Netty 2에 대한 조기 지원
- JDK `HttpClient`는 `WebClient`와 통합되었습니다.

### 관찰 가능성

Spring 프레임워크의 여러 부분에서 [Micrometer Observation](https://micrometer.io/docs/observation)을 사용한 직접 관찰 가능성 계측. 이제 `spring-web` 모듈에는 컴파일 종속성으로 `io.micrometer:micrometer-observation:1.10+`가 필요합니다.

- Spring WebFlux can be instrumented for HTTP server observations using the new `org.springframework.web.filter.reactive.ServerHttpObservationFilter`.
- Integration with Micrometer [Context Propagation](https://github.com/micrometer-metrics/context-propagation#context-propagation-library) for `Flux` and `Mono` return values from controller methods.
- `RestTemplate` 및 `WebClient`는 HTTP 클라이언트 request 관찰을 생성하도록 계측됩니다.
- 새로운 `org.springframework.web.filter.ServerHttpObservationFilter`를 사용하여 HTTP 서버 관찰을 위해 Spring MVC를 계측할 수 있습니다.
- 새로운 `org.springframework.web.filter.reactive.ServerHttpObservationFilter`를 사용하여 HTTP 서버 관찰을 위해 Spring WebFlux를 계측할 수 있습니다.
- Controller 메서드의 Flux 및 Mono return value을 위한  Micrometer [Context Propagation](https://github.com/micrometer-metrics/context-propagation#context-propagation-library) 와 통합.

### Testing

- JVM 또는 GraalVM 기본 이미지 내에서 AOT 처리 애플리케이션 컨텍스트 테스트를 지원합니다.
- HtmlUnit 2.64+ 요청 매개변수 처리와 통합.
- Servlet mocks (`MockHttpServletRequest`, `MockHttpSession`)은 현재 Servlet API 6.0을 기반으로 합니다.