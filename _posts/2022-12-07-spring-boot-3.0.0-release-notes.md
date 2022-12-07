---
title:  "Spring Boot 3.0 Release Notes"
excerpt: "Spring Boot 3.0 Release Notes 원문을 번역한 내용입니다."
author_profile: true
date: 2022-12-07 08:52:00 +0900
last_modified_at: 2022-12-07 08:52:00 +0900

categories:
- spring boot
- spring

tags: [spring, spring boot, spring boot 3.0, spring boot 3.0.0, release note, 릴리즈]
---

원문문서 : [https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Release-Notes)

위의 원문을 번역한 내용입니다.

## Spring Boot 2.7에서 업그레이드

이것은 Spring Boot의 주요 릴리스이므로 기존 애플리케이션을 업그레이드하는 것이 평소보다 조금 더 복잡할 수 있습니다. 기존 Spring Boot 2.7 애플리케이션을 업그레이드하는 데 도움이 되는 전용 마이그레이션 가이드를 마련했습니다.

> 마이그레이션 가이드 [https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide)
>

현재 이전 버전의 Spring Boot 로 실행 중인 경우 Spring Boot 3.0으로 마이그레이션하기 전에  Spring Boot 2.7로 업그레이드하는 것이 좋습니다.

## 새로운 주목할만한 사항

> **Tip**. configuration 에 대한 전체 개요는 [the configuration changelog](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Configuration-Changelog) 를 확인하십시오.
>

### Java 17 Baseline and Java 19 Supportpplications.

Spring Boot 3.0에는 최소 버전으로 Java 17 이 필요합니다. 현재 Java 8 또는 Java 11을 사용 중인 경우 Spring Boot 3.0 어플리케이션을 개발하려면 먼저 JDK를 업그레이드 해야 합니다.

Spring Boot 3.0 도 잘 작동하며 JDK 19에서 테스트 되었습니다.

### GraalVM Baseline and Native Build Tools

Spring Boot 3.0은  Graal 22.3 이상 및 Native Build Tools Plugin 0.9.17 이상이 필요합니다.

### Third-party Library Upgrades

Spring Boot 3.0은 Spring Framework 6을 기반으로 하며 Spring Framework 6이 필요합니다 . [Spring Framework 6.0에서 사용할 수 있는 새로운 기능](https://github.com/spring-projects/spring-framework/wiki/What's-New-in-Spring-Framework-6.x) 에 대해 읽어보고 싶을 것 입니다.

이 릴리스에서 업그레이드된 다른 Spring 프로젝트는 다음과 같습니다.

- [Spring AMQP 3.0](https://github.com/spring-projects/spring-amqp/releases/tag/v3.0.0).
- [Spring Batch 5.0](https://github.com/spring-projects/spring-batch/releases/tag/5.0.0).
- [Spring Data 2022.0](https://github.com/spring-projects/spring-data-commons/wiki/Spring-Data-2022.0-%28Turing%29-Release-Notes).
- [Spring GraphQL 1.1](https://github.com/spring-projects/spring-graphql/releases/tag/v1.1.0).
- [Spring HATEOAS 2.0](https://github.com/spring-projects/spring-hateoas/releases/tag/2.0.0).
- [Spring Integration 6.0](https://github.com/spring-projects/spring-integration/releases/tag/v6.0.0).
- [Spring Kafka 3.0](https://github.com/spring-projects/spring-kafka/releases/tag/v3.0.0).
- [Spring LDAP 3.0](https://github.com/spring-projects/spring-ldap/releases/tag/3.0.0).
- [Spring REST Docs 3.0](https://github.com/spring-projects/spring-restdocs/wiki/Spring-REST-Docs-3.0-Release-Notes).
- [Spring Retry 2.0](https://github.com/spring-projects/spring-retry/releases/tag/v2.0.0).
- [Spring Security 6.0](https://github.com/spring-projects/spring-security/releases/tag/6.0.0) (see also [what’s new](https://docs.spring.io/spring-security/reference/6.0/whats-new.html)).
- [Spring Session 3.0](https://github.com/spring-projects/spring-session/releases/tag/3.0.0)
- [Spring WS 4.0](https://github.com/spring-projects/spring-ws/releases/tag/4.0.0).

Spring Boot 3.0은 모든 종속성에 대해 Java EE에서 Jakarta EE API로 마이그레이션했습니다. 가능하면 다음을 포함하여 Jakarta EE 10 호환 종속성을 선택했습니다.

- Jakarta Activation 2.1
- Jakarta JMS 3.1
- Jakarta JSON 2.1
- Jakarta JSON Bind 3.0
- Jakarta Mail 2.1
- Jakarta Persistence 3.1
- Jakarta Servlet 6.0
- Jakarta Servlet JSP JSTL 3.0
- Jakarta Transaction 2.0
- Jakarta Validation 3.0
- Jakarta WebSocket 2.1
- Jakarta WS RS 3.1
- Jakarta XML SOAP 3.0
- Jakarta XML WS 4.0

또한 가능할 때마다 타사 jar의 최신 안정 릴리스로 업그레이드했습니다. 여기서 주목할 만한 종속성 업그레이드는 다음과 같습니다.

- Couchbase Client 3.4
- Elasticsearch Client 8.5
- [Flyway 9](https://flywaydb.org/documentation/learnmore/releaseNotes#9.0.0)
- Groovy 4.0
- [Hibernate 6.1](https://in.relation.to/2022/06/24/hibernate-orm-61-features/)
- Hibernate Validator 8.0
- Jackson 2.14
- Jersey 3.1
- Jetty 11
- jOOQ 3.16
- Kotlin 1.7.20
- [Liquibase 4.13](https://docs.liquibase.com/release-notes/home.html)
- [Lettuce 6.2](https://github.com/lettuce-io/lettuce-core/releases/tag/6.2.0.RELEASE)
- [Log4j 2.18](https://logging.apache.org/log4j/2.x/changes-report.html#a2.18.0)
- [Logback 1.4](https://logback.qos.ch/news.html)
- [Micrometer 1.10](https://github.com/micrometer-metrics/micrometer/releases/tag/v1.10.0)
- [Micrometer Tracing 1.0](https://github.com/micrometer-metrics/tracing/releases/tag/v1.0.0)
- Neo4j Java Driver 5.2
- Netty 4.1.77.Final
- [OkHttp 4.10](https://square.github.io/okhttp/changelogs/changelog_4x/#version-4100)
- [R2DBC 1.0](https://r2dbc.io/2022/04/25/r2dbc-1.0-goes-ga)
- [Reactor 2022.0](https://github.com/reactor/reactor/releases/tag/2022.0.0)
- [SLF4J 2.0](https://www.slf4j.org/news.html)
- SnakeYAML 1.32
- Tomcat 10
- Thymeleaf 3.1.0.M2
- Undertow 2.2.20.Final

### GraalVM Native Image 지원

Spring Boot 3.0 애플리케이션은 이제 상당한 메모리 및 시작 성능 향상을 제공할 수 있는 GraalVM 네이티브 이미지로 변환될 수 있습니다. GraalVM 네이티브 이미지 지원은 전체 Spring 포트폴리오에서 수행된 주요 엔지니어링 노력이었습니다.

GraalVM 네이티브 이미지를 시작하려면 [업데이트된 Spring Boot 참조 문서](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/native-image.html#native-image) 를 참조하세요 .

### Log4j2 개선사항

다음 기능을 제공하는 새로운 확장으로 Log4j2 지원이 업데이트되었습니다.

- Profile-specific Configuration
- Environment Properties Lookup
- Log4j2 System Properties

자세한 내용은 [updated documentation](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/features.html#features.logging.log4j2-extensions) 를 참조하십시오.

### 향상된 @ConstructorBinding 탐지

When using constructor

바인딩된 생성자를 사용할 때 `@ConfigurationProperties`클래스 `@ConstructorBinding`에 단일 매개 변수화된 생성자가 있는 경우 어노테이션이 더 이상 필요하지 않습니다. 하나 이상의 생성자가 있는 경우 `@ConstructorBinding`Spring Boot에 사용할 것을 알리기 위해 여전히 사용해야 합니다.

대부분의 사용자는 이 업데이트된 논리를 통해 더 간단한 `@ConfigurationProperties`클래스를 사용할 수 있습니다. 그러나 `@ConfigurationProperties`bean을 바인딩하지 않고 생성자에 주입하려는 경우 이제 `@Autowired`어노테이션을 추가해야 합니다.

### Micrometer 업데이트

### Micrometer Observation API 을 위한 Auto-configuration

Spring Boot 3.0은 Micrometer 1.10에 도입된 새로운 관찰 API를 지원합니다.  `ObservationRegistry`인터페이스를 사용하여 지표와 추적 모두에 단일 API를 제공하는 관찰을 생성할 수 있습니다. Spring Boot는 이제 `ObservationRegistry` 인스턴스를 자동으로 구성 합니다.

`micrometer-core`가 class path에 있으면 `DefaultMeterObservationHandler`가 `ObservationRegistry`에 등록됩니다. 즉, 모든 중지된 관찰이 타이머로 이어집니다. `ObservationPredicate`, `GlobalObservationConvention` 및 `ObservationHandler`는 `ObservationRegistry`에 자동으로 등록됩니다. 필요한 경우 `ObservationRegistryCustomizer`를 사용하여 `ObservationRegistry`를 추가로 커스터마이징 설정을 할 수 있습니다.

자세한 내용은 참조 문서의 [새로운 'Observability' 섹션](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/actuator.html#actuator.observability) 을 참조하세요.

### Micrometer Tracing 을 위한 Auto-configuration

Spring Boot는 이제 [마이크로미터 추적](https://micrometer.io/docs/tracing)을 자동으로 구성합니다. 여기에는 Brave, OpenTelemetry, Zipkin 및 Wavefront에 대한 지원이 포함됩니다.

Micrometer Observation API를 사용하는 경우 관찰을 마치면 Zipkin 또는 Wavefront에 보고된 범위로 이어집니다. 추적은 `management.tracing` 아래의 속성으로 제어할 수 있습니다. Zipkin은 `management.zipkin.tracing`으로 구성할 수 있으며 Wavefront는 `management.wavefront`를 사용합니다.

추가해야 하는 다양한 종속성을 포함한 자세한 내용은 참조 문서의 [the tracing section](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/actuator.html#actuator.micrometer-tracing) 에 있습니다.

### Micrometer’s OtlpMeterRegistry 을 위한 Auto-configuration for

OtlpMeterRegistry는 이제 `io.micrometer:micrometer-registry-otlp`가 classpath에 있을 때 자동으로 구성됩니다. meter registry는 `management.otlp.metrics.export.*` 속성을 사용하여 구성할 수 있습니다.

### Prometheus 지원

### Prometheus Exemplars 을 위한 Auto-Configuration

When there is a Micrometer Tracing `Tracer` bean and Prometheus is on the classpath, a `SpanContextSupplier` is now auto-configured. This supplier links metrics to traces by making the current trace ID and span ID available to Prometheus.

### Shutdown 시 Prometheus Push Gateway 에 대한 Put 생성

Push Gateway는 [종료 시 PUT을 수행](https://github.com/prometheus/pushgateway#put-method)하도록 구성할 수 있습니다. 이렇게 하려면 `management.prometheus.metrics.export.pushgateway.shutdown-operation`을 `put`으로 설정합니다. 또한 기존 `push` 설정은 지원 중단되었으며 이제 대신 `post`를 사용해야 합니다.

### Spring Data JDBC 를 위한 보다 유연한 Auto-configuration

Spring Data JDBC의 Auto-configuration이 이제 더 유연해졌습니다. Spring Data JDBC에 필요한 Auto-configuration Bean은 이제 조건부이며 동일한 유형의 bean을 정의하여 대체할 수 있습니다. 이제 교체할 수 있는 bean 유형은 다음과 같습니다.

- `org.springframework.data.jdbc.core.JdbcAggregateTemplate`
- `org.springframework.data.jdbc.core.convert.DataAccessStrategy`
- `org.springframework.data.jdbc.core.convert.JdbcConverter`
- `org.springframework.data.jdbc.core.convert.JdbcCustomConversions`
- `org.springframework.data.jdbc.core.mapping.JdbcMappingContext`
- `org.springframework.data.relational.RelationalManagedTypes`
- `org.springframework.data.relational.core.dialect.Dialect`

### Apache Kafka로 Async Acks 활성화

Kafka에서 비동기 ack를 활성화하기 위한 새로운 configuration property인 `spring.kafka.listener.async-acks`가 추가되었습니다. 비동기 ack를 사용 설정하려면 속성을 `true`로 설정하세요. 이 속성은 `spring.kafka.listener.async-mode`가 `manual` 또는 `manual-immediate`로 설정된 경우에만 적용됩니다.

### Elasticsearch Java Client

[new Elasticsearch Java Client](https://www.elastic.co/guide/en/elasticsearch/client/java-api-client/8.3/index.html)에 대한 auto-configuration이 도입되었습니다. 기존 `spring.elasticsearch.*` 구성 속성을 사용하여 구성할 수 있습니다.

### JdkClientHttpConnector의 Auto-configuration

Reactor Netty가 없으면 Jetty의 반응형 클라이언트 및 Apache HTTP 클라이언트 `JdkClientHttpConnector`가 이제 auto-configured됩니다. 이를 통해 `WebClient`를 JDK의 HttpClient와 함께 사용할 수 있습니다.

### Main Methods 가 있는 @SpringBootTest

`@SpringBootTest` 어노테이션은 이제 사용 가능한 경우 검색된 모든 `@SpringBootConfiguration` 클래스의 `main`을 사용할 수 있습니다. 즉, main 메서드에서 수행한 모든 맞춤 `SpringApplication` 구성을 이제 테스트에서 선택할 수 있습니다.

테스트에 `main` 메서드를 사용하려면 `@SpringBootTest`의 `useMainMethod` 속성을 `UseMainMethod.ALWAYS` 또는 `UseMainMethod.WHEN_AVAILABLE`로 설정하세요.

[updated reference documentation](https://docs.spring.io/spring-boot/docs/3.0.0/reference/html/features.html#features.testing.spring-boot-applications.using-main) 에 자세한 내용을 확인하십시오.

### 그외 여러가지 사항

위에 나열된 변경 사항 외에도 다음과 같은 몇 가지 사소한 조정 및 개선 사항이 있습니다.

- 애플리케이션 시작 중에 호스트 이름이 더 이상 기록되지 않습니다. 이는 시작 시간을 개선하는 데 도움이 되는 네트워크 조회를 방지합니다.
- Java `SecurityManager` 지원이 JDK에서 지원 중단됨에 따라 제거되었습니다.
- Spring Framework의 `CommonsMultipartResolver`에 대한 지원이 Spring Framework 6에서 제거된 후 제거되었습니다.
- `spring.mvc.ignore-default-model-on-redirect`는 업스트림 Spring Framework 변경 사항에 맞춰 지원 중단되었습니다.
- WebJars 리소스 핸들러 경로 패턴은 `spring.mvc.webjars-path-pattern` 또는 `spring.webflux.webjars-path-pattern`을 사용하여 커스터마이징 할 수 있습니다.
- Tomcat remote IP valve의 신뢰할 수 있는 프록시는 `server.tomcat.remoteip.trusted-proxies`를 사용하여 구성할 수 있습니다.
- 이제 `ValidationConfigurationCustomizer` bean을 정의하여 bean 유효성 검사 `Configuration`을 커스터마이징 할 수 있습니다.
- Log4j2의 `Log4jBridgeHandler`는 이제 SLF4J를 통한 라우팅이 아닌 JUL 기반 로그인을 Log4j2로 라우팅하는 데 사용됩니다.
- `MeterBinder` 인터페이스를 구현하는 Bean은 이제 모든 싱글톤 Bean이 초기화된 후에만 meter registries에 바인딩됩니다.
- Brave 및 OpenTelemetry용 `SpanCustomizer` bean이 이제 자동으로 구성됩니다.
- Micrometer의 JvmCompilationMetrics는 이제 자동으로 구성됩니다.
- `DiskSpaceHealthIndicator`는 이제 로그 메시지 및 상태 세부정보에 path를 포함합니다.
- `DataSourceBuilder`는 이제 래핑된 `DataSource`에서 파생될 수 있습니다.
- 이제 `spring.data.mongodb.additional-hosts` 속성을 사용하여 MongoDB에 대해 여러 호스트를 구성할 수 있습니다.
- Elasticsearch의 socketKeepAlive 속성은 `spring.elasticsearch.socket-keep-alive` 속성을 사용하여 구성할 수 있습니다.
- `spring-rabbit-stream`을 사용할 때 `RabbitStreamTemplate` 및 `Environment`는 이제 `spring.rabbitmq.listener.type`이 `stream`인지 여부에 관계없이 자동 구성됩니다.
- Existing Kafka topics can be modified using `spring.kafka.admin.modify-topic-configs`.
- 기존 Kafka topics는 `spring.kafka.admin.modify-topic-configs`를 사용하여 수정할 수 있습니다.
- `WebDriverScope` 및 `WebDriverTestExecutionListener`가 공개되어 커스텀 테스트 설정에서 `WebDriver`를 쉽게 사용할 수 있습니다.

### Spring Boot 3.0의 지원 중단

- `@ConstructorBinding` 의 패키지가 `org.springframework.boot.context.properties` 에서 `org.springframework.boot.context.properties.bind` 으로 재배치 되었습니다.
- `JsonMixinModule` scanning based 생성자는 더 이상 사용되지 않습니다.
- `ClientHttpRequestFactories` 를 `ClientHttpRequestFactorySupplier` 교
- Cookie `comment` 속성은 더 이상 지원되지 않습니다.
- `RestTemplateExchangeTagsProvider`, `WebClientExchangeTagsProvider`, `WebFluxTagsProvider`, `WebMvcTagsProvider` 와 관련 클래스가 동등한 `ObservationConvention` 로 대체되었습니다.
- `HealthContributor` `@Configuration` 기본 클래스의 인수 없는 생성자는 더 이상 사용되지 않습니다.
- `DefaultTestExecutionListenersPostProcessor`와 `SpringBootDependencyInjectionTestExecutionListener`는 Spring Framework의 ApplicationContextFailureProcessor를 위해 더 이상 사용되지 않습니다.
- 속성 `management.metrics.export.<product>` 는 더 이상 사용되지 않으며, 대체는`management.<product>.metrics.export`입니다.
- `post` 를 선호하는 `management.prometheus.metrics.export.pushgateway.shutdown-operation` 의 `push` 설정입니다.
- `@AutoConfigureMetrics` 는 `@AutoConfigureObservability` 을 위해 더 이상 사용하지 않습니다.