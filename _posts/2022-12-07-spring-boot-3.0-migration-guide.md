---
title:  "Spring Boot 3.0 Migration Guide"
excerpt: "Spring Boot 3.0 마이그레이션 가이드 공식 문서를 번역한 내용입니다."
author_profile: true
date: 2022-12-07 09:26:00 +0900
last_modified_at: 2022-12-07 09:26:00 +0900

categories:
- spring boot

tags: [spring, spring boot, spring boot 3.0, spring boot 3.0.0, migration, 마이그레이션]
---

원본문서 : [https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-3.0-Migration-Guide)

이 문서는 어플리케이션을 Spring Boot 3.0 으로 마이그레이션 하는데 도움을 주기 위함입니다.

## 시작하기 전에

### 최신 `2.7.x` 버전으로 업그레이드

업그레이드를 시작하기 전에 사용 가능한 최신 `2.7.x` 버전으로 업그레이드해야 합니다. 이렇게 하면 해당 라인의 최신 종속성에 대해 빌드하고 있는지 확인할 수 있습니다.

### 종속성 검토

Spring Boot 3으로 이동하면 많은 종속성이 업그레이드되며 사용자 측에서 작업이 필요할 수 있습니다. [dependency management for `3.0.x`](https://docs.spring.io/spring-boot/docs/3.0.0-SNAPSHOT/reference/html/dependency-versions.html#appendix.dependency-versions)와 함께 [dependency management for `2.7.x`](https://docs.spring.io/spring-boot/docs/2.7.x/reference/html/dependency-versions.html#appendix.dependency-versions)를 검토하여 프로젝트가 어떤 영향을 받는지 평가할 수 있습니다.

Spring Boot에서 관리하지 않는 종속성(예: Spring Cloud)을 사용할 수도 있습니다. 프로젝트에서 이에 대한 명시적 버전을 정의하므로 업그레이드하기 전에 먼저 호환 가능한 버전을 식별해야 합니다.

### 시스템 요구 사항 검토

**Spring Boot 3.0에는 Java 17 이상이 필요합니다.** Java 8은 더 이상 지원되지 않습니다. 또한 Spring Framework 6.0이 필요합니다.

### Spring Boot 2.x의 지원 중단 검토

Spring Boot 2.x에서 더 이상 사용되지 않는 클래스, 메서드 및 속성은 이 릴리스에서 제거되었습니다. 업그레이드하기 전에 더 이상 사용되지 않는 메서드를 호출하고 있지 않은지 확인하십시오.

## S**pring Boot 3 로 업그레이드**

프로젝트의 상태와 해당 종속성을 검토한 후 Spring Boot 3.0의 최신 유지 관리 릴리스로 업그레이드합니다.

### **Configuration Properties 마이그레이션**

Spring Boot 3.0에서는 몇 가지 configuration 속성의 이름이 바뀌거나 제거되었으며 개발자는 그에 따라 `[application.properties`/](http://application.properties/) `application.yml`을 업데이트해야 합니다. 이를 돕기 위해 Spring Boot는 `spring-boot-properties-migrator` 모듈을 제공합니다. 프로젝트에 종속성으로 추가되면 애플리케이션 환경을 분석하고 시작할 때 진단을 출력할 뿐만 아니라 런타임에 속성을 일시적으로 마이그레이션합니다.

Maven pom.xml에 다음을 추가하여 마이그레이션기를 추가할 수 있습니다.

```xml
<dependency>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-properties-migrator</artifactId>
	<scope>runtime</scope>
</dependency>
```

또는 Gradle 사용:

```groovy
runtime("org.springframework.boot:spring-boot-properties-migrator")
```

> Note.  마이그레이션이 완료되면 프로젝트의 종속성에서 이 모듈을 제거해야 합니다.
>

### Spring framework 6.0

Spring Boot 3.0은 Spring Framework 6.0이 필요합니다. 계속하기 전에 [upgrade guide](https://github.com/spring-projects/spring-framework/wiki/Upgrading-to-Spring-Framework-6.x)를 검토할 수 있습니다.

### **Jakarta EE**

Spring Boot가 Jakarta EE 사양에 의존할 때마다 Spring Boot 3.0은 Jakarta EE 10에 포함된 버전으로 업그레이드되었습니다. 예를 들어 Spring Boot 3.0은 Servlet 6.0 및 JPA 3.1 스펙을 사용합니다.

자체 종속성을 관리하고 있으며 starter POM에 의존하지 않는 경우 Maven 또는 Gradle 파일을 적절하게 업데이트했는지 확인해야 합니다. 이전 Java EE 종속성이 더 이상 빌드에서 직접 또는 전이적으로 사용되지 않도록 특히 주의해야 합니다. 예를 들어 항상 `javax.servlet:javax.servlet-api`가 아닌 `jakarta.servlet:jakarta.servlet-api`를 사용해야 하는 경우입니다.

종속성 조정 변경뿐만 아니라 Jakarta EE는 이제 javax가 아닌 `jakarta` 패키지를 사용합니다. 종속 항목을 업데이트하면 프로젝트의 `import` 문을 업데이트해야 할 수 있습니다.

다음을 포함하여 마이그레이션에 도움이 되는 여러 가지 도구가 있습니다.

- [OpenRewrite recipes](https://docs.openrewrite.org/reference/recipes/java/migrate/javaxmigrationtojakarta).
- [The Spring Boot Migrator project](https://github.com/spring-projects-experimental/spring-boot-migrator).
- [Migration support in IntelliJ IDEA](https://blog.jetbrains.com/idea/2021/06/intellij-idea-eap-6/).

### 핵심 변경 사항

대부분의 애플리케이션과 관련된 Spring Boot의 핵심에 몇 가지 변경 사항이 적용되었습니다.

**Image Banner Support Removed**

이미지 기반 애플리케이션 배너에 대한 지원이 제거되었습니다. `banner.gif`, `banner.jpg` 및 `banner.png` 파일은 이제 무시되며 텍스트 기반 `banner.txt` 파일로 교체해야 합니다.

**Logging Date Format**

Logback 및 Log4j2에 대한 로그 메시지의 날짜 및 시간 구성 요소에 대한 기본 형식이 ISO-8601 표준에 맞게 변경되었습니다. 새로운 기본 형식 `yyyy-MM-dd'T'HH:mm:ss.SSSXXX`는 공백 문자 대신 `T`를 사용하여 날짜와 시간을 구분하고 끝에 시간대 오프셋을 추가합니다. `LOG_DATEFORMAT_PATTERN` 환경 변수 또는 `logging.pattern.dateformat` 속성은 `yyyy-MM-dd HH:mm:ss.SSS`의 이전 기본값을 복원하는 데 사용할 수 있습니다.

**@ConstructingBinding 은 Type Level에서 더 이상 필요하지 않습니다.**

`@ConstructorBinding`은 더 이상 `@ConfigurationProperties` 클래스의 유형 수준에서 필요하지 않으므로 제거해야 합니다. 클래스 또는 레코드에 여러 생성자가 있는 경우 속성 바인딩에 사용해야 하는 생성자를 나타내기 위해 여전히 생성자에서 사용할 수 있습니다.

**YamlJsonParser 가 제거되었습니다.**

SnakeYAML의 JSON 파싱이 다른 파서 구현과 일치하지 않아 `YamlJsonParser`가 삭제되었습니다. 드문 경우지만 `YamlJsonParser`를 직접 사용하고 있었다면 다른 `JsonParser` 구현 중 하나로 이전하세요.

**Auto-configuration Files**

Spring Boot 2.7은 [auto-configurations](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.7-Release-Notes#changes-to-auto-configuration) 등록을 위한 새로운 `META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports` 파일을 도입하면서 `spring.factories`의 등록과 하위 호환성을 유지합니다. 이 릴리스에서는 imports 파일을 위해 `spring.factories`에서 auto-configurations  등록 지원이 제거되었습니다.

### Web Application 변경 사항

웹 애플리케이션을 업그레이드하는 경우 다음 섹션을 검토해야 합니다.

**Spring MVC와 WebFlux URL Matching 변경사항**

As of Spring Framework 6.0, the trailing slash matching configuration option has been deprecated and its default value set to `false`. This means that previously, the following controller would match both "GET /some/greeting" and "GET /some/greeting/":

Spring Framework 6.0부터 후행 슬래시 일치 구성 옵션은 더 이상 사용되지 않으며 기본값은 `false`로 설정됩니다. 이는 이전에 다음 컨트롤러가 "GET /some/greeting" 및 "GET /some/greeting/" 모두와 일치함을 의미합니다.

```java
@RestController
public class MyController {

  @GetMapping("/some/greeting")
  public String greeting {
    return "Hello";
  }

}
```

[Spring Framework 변경사항](https://github.com/spring-projects/spring-framework/issues/28552)으로부터 기본적으로 "GET /some/greeting/" 더 이상 일치하지 않습니다.

Developers should instead configure explicit redirects/rewrites through a proxy, a Servlet/web filter, or even declare the additional route explicitly on the controller handler (like `@GetMapping("/some/greeting", "/some/greeting/")` for more targeted cases.

대신 개발자는 프록시, servlet/web filter를 통해 명시적 redirects/rewrites을 구성하거나 더 많은 대상 케이스를 위해 컨트롤러 핸들러에서 명시적으로 추가 경로를 선언해야 합니다.(`@GetMapping("/some/greeting", "/some/greeting/") 등`)

애플리케이션이 이 변경 사항에 완전히 적응할 때까지 다음 전역 구성으로 기본값을 변경할 수 있습니다.

```java
@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void configurePathMatch(PathMatchConfigurer configurer) {
      configurer.setUseTrailingSlashMatch(true);
    }

}
```

**'server.max-http-header-size'**

이전에는 `server.max-http-header-size`가 지원되는 내장 웹 서버 4개에서 일관되지 않게 처리되었습니다. Jetty, Netty 또는 Undertow를 사용하는 경우 최대 HTTP request header 크기를 구성합니다. Tomcat을 사용할 때 최대 HTTP request 및 response header 크기를 구성합니다.

이러한 불일치를 해결하기 위해 `server.max-http-header-size`가 지원 중단되었으며 대체 `server.max-http-request-header-size`가 도입되었습니다. 이제 두 속성 모두 기본 웹 서버에 관계없이 request header 크기에만 적용됩니다.

Tomcat 또는 Jetty(이러한 설정을 지원하는 유일한 두 서버)에서 HTTP 응답의 최대 헤더 크기를 제한하려면 `WebServerFactoryCustomizer`를 사용하세요.

**정상적인 Shutdown을 위한 업데이트된 단계**

정상적인 종료를 위해 `SmartLifecycle` 구현에서 사용하는 단계가 업데이트되었습니다. 단계적 종료는 이제 `SmartLifecycle.DEFAULT_PHASE - 2048` 단계에서 시작되고 웹 서버는 `SmartLifecycle.DEFAULT_PHASE - 1024` 단계에서 중지됩니다. 단계적 종료에 참여했던 모든 `SmartLifecycle` 구현은 그에 따라 업데이트되어야 합니다.

**Jetty**

Jetty는 아직 Servlet 6.0을 지원하지 않습니다. Spring Boot 3.0에서 Jetty를 사용하려면 Servlet API를 5.0으로 다운그레이드해야 합니다. 이를 위해 `jakarta-servlet.version` 속성을 사용할 수 있습니다.

### **Actuator 변경 사항**

Spring Boot의 actuator 모듈을 사용하는 경우 다음 업데이트를 숙지해야 합니다.

**JMX Endpoint 노출**

기본적으로 건강 엔드포인트만 JMX를 통해 노출되어 기본 웹 엔드포인트 노출과 일치합니다. 이는 `management.endpoints.jmx.exposure.include` 및 `management.endpoints.jmx.exposure.exclude` 속성을 구성하여 변경할 수 있습니다.

**'httptrace' 엔드포인트 이름이 'httpexchanges'로 변경됨**

'httptrace' 엔드포인트 및 관련 인프라는 최근 HTTP request-response 교환에 대한 정보를 기록하고 액세스를 제공합니다. [Micrometer Tracing](https://micrometer.io/docs/tracing)에 대한 지원이 도입된 후 '`httptrace`'라는 이름이 혼동을 일으킬 수 있습니다. 이러한 혼란을 줄이기 위해 엔드포인트의 이름이 '`httpexchanges`'로 변경되었습니다. 엔드포인트의 response 내용도 이 이름 변경의 영향을 받았습니다. 자세한 내용은 Actuator API 설명서를 참조하세요.

관련 인프라 클래스의 이름도 변경되었습니다. 예를 들어 `HttpTraceRepository`는 이제 `HttpExchangeRepository`라는 이름이 지정되었으며 `org.springframework.boot.actuate.web.exchanges` 패키지에서 찾을 수 있습니다.

**Actuator JSON**

Responses from the actuator endpoints shipped with Spring Boot now use an isolated `ObjectMapper` instance to ensure results are consistent. If you want to revert to the old behavior and use the application `ObjectMapper` you can set `management.endpoints.jackson.isolated-object-mapper` to `false`.

If you have developed your own endpoints, you might want to ensure that responses implement the `OperationResponseBody` interface. This will ensure that the isolated `ObjectMapper` is considered when serializing the response as JSON.

Spring Boot와 함께 제공되는 actuator 엔드포인트의 response은 이제 격리된 `ObjectMapper` 인스턴스를 사용하여 결과의 일관성을 보장합니다. 이전 동작으로 되돌리고 `ObjectMapper` 애플리케이션을 사용하려면 `management.endpoints.jackson.isolated-object-mapper`를 `false`로 설정할 수 있습니다.

자체 엔드포인트를 개발한 경우 response가 `OperationResponseBody` 인터페이스를 구현하도록 할 수 있습니다. 이렇게 하면 response를 JSON으로 직렬화할 때 격리된 `ObjectMapper`가 고려됩니다.

**Actuator Endpoints Sanitization**

`/env` 및 `/configprops` 엔드포인트에는 민감한 값이 포함될 수 있으므로 모든 값은 기본적으로 항상 마스킹됩니다. 이전에는 민감한 것으로 간주되는 키의 경우에만 사용되었습니다.

대신 이 릴리스에서는 보다 안전한 기본값을 선택합니다. health 엔드포인트 세부 정보와 유사한 role 기반 접근 방식을 위해 키 기반 접근 방식이 제거되었습니다. 삭제되지 않은 값이 표시되는지 여부는 다음 값을 가질 수 있는 속성을 사용하여 구성할 수 있습니다.

- `NEVER` - 모든 값이 삭제됩니다.
- `ALWAYS` - 출력에 모든 값이 있습니다. (삭제 기능이 적용됨).
- `WHEN_AUTHORIZED` - 값은 사용자가 승인된 경우에만 출력에 표시됩니다(삭제 기능이 적용됨).

JMX의 경우 사용자는 항상 인증된 것으로 간주됩니다. HTTP의 경우 사용자가 인증되고 지정된 role이 있으면 권한이 부여된 것으로 간주됩니다.

QuartzEndpoint에 대한 삭제도 같은 방식으로 구성할 수 있습니다.

### Micrometer와 Metrics 변경 사항

Spring Boot 3.0은 Micrometer 1.10을 기반으로 합니다. 애플리케이션이 metrics을 수집하고 내보내는 경우 다음 변경 사항을 알고 있어야 합니다.

**Spring Boot 2.x instrumentation 지원 중단**

Observation 지원과의 통합으로 인해 이제 이전 계측을 더 이상 사용하지 않습니다. 실제 계측을 수행하는 filter, interceptors는 전체 버그 클래스를 해결할 수 없고 중복 계측의 위험이 너무 높기 때문에 완전히 제거되었습니다. 예를 들어 `WebMvcMetricsFilter`는 완전히 삭제되었으며 사실상 Spring Framework의 `ServerHttpObservationFilter`로 대체되었습니다. 해당하는 `*TagProvider` `*TagContributor` 및 `*Tags` 클래스는 지원 중단되었습니다. 더 이상 관찰 장비에서 기본적으로 사용되지 않습니다. 개발자가 기존 인프라를 새 인프라로 마이그레이션할 수 있도록 지원 중단 단계 동안 유지하고 있습니다.

**Tag providers 와 contributors 마이그레이션**

애플리케이션이 메트릭을 커스터마이징하는 경우 코드베이스에서 새로운 지원 중단을 볼 수 있습니다. 새 모델에서는 태그 공급자와 기여자가 관찰 규칙으로 대체됩니다. Spring Boot 2.x에서 Spring MVC "http.server.requests" 메트릭 계측 지원의 예를 들어 보겠습니다.

`TagContributor`로 추가 `Tags`를 제공하거나 `TagProvider`를 부분적으로 재정의하는 경우 요구사항에 맞게 `DefaultServerRequestObservationConvention`을 확장해야 합니다.

```java
public class ExtendedServerRequestObservationConvention extends DefaultServerRequestObservationConvention {

  @Override
  public KeyValues getLowCardinalityKeyValues(ServerRequestObservationContext context) {
    // here, we just want to have an additional KeyValue to the observation, keeping the default values
    return super.getLowCardinalityKeyValues(context).and(custom(context));
  }

  protected KeyValue custom(ServerRequestObservationContext context) {
    return KeyValue.of("custom.method", context.getCarrier().getMethod());
  }

}
```

측정항목 태그를 크게 변경하는 경우 `WebMvcTagsProvider`를 커스텀 구현으로 대체하고 이를 bean으로 기여하고 있을 수 있습니다. 이 경우 관심 있는 관찰에 대한 규칙을 구현해야 할 것입니다. 여기에서는 `ServerRequestObservationConvention`을 구현합니다. `ServerRequestObservationContext`를 사용하여 현재 request에 대한 정보를 추출합니다. 그런 다음 요구 사항을 염두에 두고 메서드를 구현할 수 있습니다.

```java
public class CustomServerRequestObservationConvention implements ServerRequestObservationContext {

  @Override
  public String getName() {
    // will be used for the metric name
    return "http.server.requests";
  }

  @Override
  public String getContextualName(ServerRequestObservationContext context) {
    // will be used for the trace name
    return "http " + context.getCarrier().getMethod().toLowerCase();
  }

  @Override
  public KeyValues getLowCardinalityKeyValues(ServerRequestObservationContext context) {
    return KeyValues.of(method(context), status(context), exception(context));
  }

  @Override
  public KeyValues getHighCardinalityKeyValues(ServerRequestObservationContext context) {
    return KeyValues.of(httpUrl(context));
  }

  protected KeyValue method(ServerRequestObservationContext context) {
    // You should reuse as much as possible the corresponding ObservationDocumentation for key names
    return KeyValue.of(ServerHttpObservationDocumentation.LowCardinalityKeyNames.METHOD, context.getCarrier().getMethod());
  }

  //...
}
```

두 경우 모두 응용 프로그램 컨텍스트에 bean으로 제공할 수 있으며 auto-configuration에 의해 선택되어 기본 구성을 효과적으로 대체합니다.

```java
@Configuration
public class CustomMvcObservationConfiguration {

  @Bean
  public ExtendedServerRequestObservationConvention extendedServerRequestObservationConvention() {
    return new ExtendedServerRequestObservationConvention();
  }

}
```

커스텀 `ObservationFilter`를 사용하여 관찰에 대한 키 값을 추가하거나 제거하여 유사한 목표를 달성할 수도 있습니다. 필터는 기본 규칙을 대체하지 않으며 사후 처리 구성 요소로 사용됩니다.

```java
public class ServerRequestObservationFilter implements ObservationFilter {

  @Override
  public Observation.Context map(Observation.Context context) {
    if (context instanceof ServerRequestObservationContext serverContext) {
      context.addLowCardinalityKeyValue(KeyValue.of("project", "spring"));
      String customAttribute = (String) serverContext.getCarrier().getAttribute("customAttribute");
      context.addLowCardinalityKeyValue(KeyValue.of("custom.attribute", customAttribute));
    }
    return context;
  }
}
```

`ObservationFilter` bean을 애플리케이션에 기여할 수 있으며 Spring Boot는 `ObservationRegistry`로 bean을 auto-configure합니다.

**Micrometer의 JvmInfoMetrics Auto-configuration**

Micrometer의 `JvmInfoMetrics`는 이제 auto-configured 됩니다. 수동으로 구성된 모든 `JvmInfoMetrics` bean 정의는 제거할 수 있습니다.

**Micrometer binders**

Micrometer 팀은 바인더를 `micrometer-binders`라는 별도의 micrometer 모듈로 옮겼습니다. 분할 패키지를 방지하기 위해 imports도 변경되었습니다. 이전 바인더를 사용하는 경우 `io.micrometer.core.instrument.binder`에서 `io.micrometer.binder`로 import를 조정하세요.

**Actuator Metrics Export Properties**

[actuator metrics export](https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#actuator.metrics) 를 제어하는 속성을 이동했습니다. 이전 스키마는 `management.metrics.export.<product>`이고 새 스키마는 `management.<product>.metrics.export`입니다. (예: prometheus 속성이 `management.metrics.export.prometheus`에서 `management.prometheus.metrics.export`로 이동됨). `spring-boot-properties-migrator`를 사용하는 경우 시작 시 알림을 받게 됩니다.

자세한 내용은 [issue #30381](https://github.com/spring-projects/spring-boot/issues/30381) 을 참조하세요.

**Mongo Health Check**

MongoDB용 `HealthIndicator`는 이제 MongoDB의 Stable API를 지원합니다. `buildInfo` 쿼리가 `isMaster`로 대체되었으며 이제 response에 버전 대신 `maxWireVersion`이 포함됩니다. [MongoDB documentation](https://www.mongodb.com/docs/v4.2/reference/command/isMaster/) 에 설명된 대로 클라이언트는 `maxWireVersion`을 사용하여 MongoDB와의 호환성을 협상할 수 있습니다. `maxWireVersion`은 정수입니다.

### **Data Access 변경사항**

애플리케이션이 데이터로 작업하는 경우 다음 변경 사항을 검토해야 합니다.

**Data properties 변경**

`spring.data` 접두사는 Spring 데이터용으로 예약되었으며 접두사 아래의 모든 속성은 classpath에 Spring 데이터가 필요함을 의미합니다.

**Cassandra Properties**

Cassandra의 구성 속성이 `spring.data.cassandra`에서 이동되었습니다. `spring.cassandra`로..

**Redis Properties**

Redis의 Configuration 속성이 `spring.redis`에서 `spring.data.redis`로 이동되었습니다. redis auto-configuration 을 사용하려면 Spring 데이터가 classpath에 있어야 합니다.

**Flyway**

Spring Boot 3.0은 기본적으로 Flyway 9.0을 사용합니다. 이것이 어플리케이션에 어떤 영향을 미칠 수 있는지 알아보려면 Flyway [release notes](https://flywaydb.org/documentation/learnmore/releaseNotes#9.0.0) 및 [blog post](https://flywaydb.org/blog/version-9-is-coming-what-developers-need-to-know)을 참조하세요.

이제 `Callback` 및 `JavaMigration` bean이 configuration에 추가된 후 `FlywayConfigurationCustomizer` bean이 호출되어 `FluentConfiguration`을 커스터마이징합니다. `Callback` 및 `JavaMigration` Bean을 정의하고 맞춤설정 도구를 사용하여 콜백 및 Java 마이그레이션을 추가하는 애플리케이션은 의도한 콜백 및 Java 마이그레이션이 사용되도록 업데이트해야 할 수 있습니다.

**Hibernate 6.1**

Spring Boot 3.0은 기본적으로 Hibernate 6.1을 사용합니다. 이것이 애플리케이션에 어떤 영향을 미칠 수 있는지 알아보려면 Hibernate [6.0](https://docs.jboss.org/hibernate/orm/6.0/migration-guide/migration-guide.html)과 [6.1](https://docs.jboss.org/hibernate/orm/6.1/migration-guide/migration-guide.html) 마이그레이션 가이드를 참조하세요.

종속성 관리 및 `spring-boot-starter-data-jpa` starter가 Hibernate 종속성에 대한 새로운 `org.hibernate.orm` group ID를 사용하도록 업데이트되었습니다.

Hibernate가 더 이상 이전 ID generator mapping으로 다시 전환하는 것을 지원하지 않으므로 `spring.jpa.hibernate.use-new-id-generator-mappings` configuration 속성이 제거되었습니다.

**Embedded MongoDB**

Flapdoodle embedded MongoDB에 대한 Auto-configuration 및 종속성 관리가 제거되었습니다. embedded MongoDB를 테스트에 사용하는 경우 [Flapdoodle project](https://github.com/flapdoodle-oss/de.flapdoodle.embed.mongo.spring)에서 제공하는 auto-configuration 라이브러리를 사용하거나 embedded MongoDB 대신 [Testcontainers](https://www.testcontainers.org/) 프로젝트를 사용하도록 테스트를 수정하세요.

**R2DBC 1.0**

Spring Boot 3.0 uses R2DBC 1.0 by default. With the 1.0 release, R2DBC no longer publishes a bill of materials (bom) which has affected Spring Boot’s dependency management. The `r2dbc-bom.version` can no longer be used to override R2DBC’s version. In its place, several new properties for the individual and separately versioned modules are now available:

Spring Boot 3.0은 기본적으로 R2DBC 1.0을 사용합니다. 1.0 릴리스에서 R2DBC는 더 이상 Spring Boot의 종속성 관리에 영향을 준 materials 명세서(BOM)를 게시하지 않습니다. `r2dbc-bom.version`은 더 이상 R2DBC의 버전을 재정의하는 데 사용할 수 없습니다. 그 자리에서 이제 개별 및 별도로 버전이 지정된 모듈에 대한 몇 가지 새로운 속성을 사용할 수 있습니다.

- `oracle-r2dbc.version` (`com.oracle.database.r2dbc:oracle-r2dbc`)
- `r2dbc-h2.version` (`io.r2dc:r2dbc-h2`)
- `r2dbc-pool.version` (`io.r2dc:r2dbc-pool`)
- `r2dbc-postgres.version` (`io.r2dc:r2dbc-postgres`)
- `r2dbc-proxy.version` (`io.r2dc:r2dbc-proxy`)
- `r2dbc-spi.version` (`io.r2dc:r2dbc-spi`)

**Elasticsearch Clients and Templates**

Elasticsearch의 상위 수준 REST 클라이언트에 대한 지원이 제거되었습니다. 대신 Elasticsearch의 새로운 Java 클라이언트에 대한 auto-configuration이 도입되었습니다. 마찬가지로 높은 수준의 REST 클라이언트 위에 구축된 Spring Data Elasticsearch 템플릿에 대한 지원이 제거되었습니다. 대신 새 Java 클라이언트를 기반으로 하는 새 템플릿에 대한 auto-configuration이 도입되었습니다. 자세한 내용은 참조 문서의 [the Elasticsearch section of the reference documentation](https://docs.spring.io/spring-boot/docs/3.0.0-SNAPSHOT/reference/html/data.html#data.nosql.elasticsearch) 섹션을 참조하세요.

`ReactiveElasticsearchRestClientAutoConfiguration`은 `ReactiveElasticsearchClientAutoConfiguration`으로 이름이 바뀌었고 `org.springframework.boot.autoconfigure.data.elasticsearch`에서 `org.springframework.boot.autoconfigure.elasticsearch`로 이동되었습니다. 모든 auto-configuration 제외 또는 주문은 그에 따라 업데이트되어야 합니다.

### **Spring Security 변경사항**

Spring Boot 3.0이 Spring Security 6.0으로 업그레이드되었습니다. 다음 섹션과 함께 [Spring Security 6.0 migration guide](https://docs.spring.io/spring-security/reference/migration/index.html)를 검토하세요.

**ReactiveUserDetailsService**

`ReactiveUserDetailsService`는 더 이상 `AuthenticationManagerResolver`가 있을 때 auto-configured 되지 않습니다. 애플리케이션이 `AuthenticationManagerResolver`가 있음에도 불구하고 `ReactiveUserDetailService`에 의존하는 경우 필요에 맞는 자체 `ReactiveUserDetailsService` bean을 정의하세요.

**SAML2 Relying Party Configuration**

`spring.security.saml2.relyingparty.registration.{id}.identity-provider`의 속성에 대한 지원이 제거되었습니다. `spring.security.saml2.relyingparty.registration.{id}.asserting-party` 아래의 새 속성을 대신 사용합니다.

### **Spring Batch 변경사항**

Spring Batch 사용자의 경우 다음 업데이트가 관련됩니다.

**@EnableBatchProcessing 이 더 이상 필요하지 않음**

이전에는 @`EnableBatchProcessing`을 사용하여 Spring Boot의 Spring Batch auto-configuration을 활성화할 수 있었습니다. 더 이상 필요하지 않으며 Boot의 auto-configuration을 사용하려는 응용 프로그램에서 제거해야 합니다. @`EnableBatchProcessing`으로 어노테이션을 달거나 Batch의 `DefaultBatchConfiguration`을 확장하는 bean은 이제 auto-configuration에 백오프를 지시하도록 정의할 수 있으므로 애플리케이션이 Batch 구성 방식을 완전히 제어할 수 있습니다.

**Multiple Batch Jobs**

여러 배치 작업 실행은 더 이상 지원되지 않습니다. auto-configuration 이 단일 작업을 감지하면 시작 시 실행됩니다. 컨텍스트에서 여러 작업이 발견되면 사용자가 `spring.batch.job.name` 속성을 사용하여 시작 시 실행할 작업 이름을 제공해야 합니다.

### **Spring Session 변경 사항**

다음 섹션은 Spring 세션 사용자와 관련이 있습니다.

**Spring Session Store Type**

`spring.session.store-type`을 통해 Spring 세션에 대한 저장소 유형을 명시적으로 구성하는 것은 더 이상 지원되지 않습니다. 클래스 경로에서 여러 세션 저장소 저장소 구현이 감지되는 경우 자동 구성되어야 하는 `SessionRepository`를 결정하기 위해 [fixed order](https://docs.spring.io/spring-boot/docs/3.0.0-SNAPSHOT/reference/html/web.html#web.spring-session)가 사용됩니다. Spring Boot의 정의된 순서가 요구 사항을 충족하지 않는 경우 고유한 SessionRepository bean을 정의하고 자동 구성을 백오프할 수 있습니다.

### **Gradle 변경 사항**

Gradle로 Spring Boot 프로젝트를 빌드하는 사용자는 다음 섹션을 검토해야 합니다.

**Gradle을 사용한 간소화된 Main Class 이름 확인**

Gradle을 사용하여 애플리케이션을 빌드할 때 애플리케이션의 main 클래스 이름 확인이 단순화되고 일관되게 되었습니다. `bootJar`, `bootRun` 및 `bootWar`는 이제 모두 main 소스 세트의 출력에서 찾아 main 클래스 이름의 이름을 확인합니다. 이렇게 하면 작업이 기본적으로 동일한 main 클래스 이름을 사용하지 않았을 수 있는 작은 위험이 제거됩니다. main 소스 세트의 출력 외부 위치에서 해결되는 main 클래스에 의존하는 경우 `springBoot` DSL의 `mainClass` 속성을 사용하여 main 클래스 이름을 구성하도록 Gradle 구성을 업데이트합니다.

```java
springBoot {
    mainClass = "com.example.Application"
}
```

또는 `resolveMainClassName` 작업의 `classpath` 속성을 구성하여 main 소스 세트의 출력 디렉터리 이외의 위치에서 검색할 수 있습니다.

**Configuring Gradle Task**

Spring Boot’s Gradle tasks have been updated to consistently use Gradle’s `Property` support for their configuration. As a result, you may need to change the way that you reference a property’s value. For example, the value of the `imageName` property on `bootBuildImage` can now be accessed using `imageName.get()`. Additionally, if you are using the Kotlin DSL, you may need to change the way that you set properties. For, example in Spring Boot 2.x, layering of the `bootJar` task could be disabled as follows:

Spring Boot의 Gradle 작업은 해당 구성에 Gradle의 속성 지원을 일관되게 사용하도록 업데이트되었습니다. 결과적으로 속성 값을 참조하는 방식을 변경해야 할 수 있습니다. 예를 들어 `bootBuildImage`의 `imageName` 속성 값은 이제 `imageName.get()을` 사용하여 액세스할 수 있습니다. 또한 Kotlin DSL을 사용하는 경우 속성을 설정하는 방식을 변경해야 할 수도 있습니다. 예를 들어 Spring Boot 2.x에서 bootJar 작업의 계층화는 다음과 같이 비활성화할 수 있습니다.

```groovy
tasks.named<BootJar>("bootJar") {
	layered {
		isEnabled = false
	}
}
```

3.0에서는 다음을 사용해야 합니다.

```groovy
tasks.named<BootJar>("bootJar") {
	layered {
		enabled.set(false)
	}
}
```

추가 예시는 [Gradle plugin’s reference documentation](https://docs.spring.io/spring-boot/docs/3.0.0-SNAPSHOT/gradle-plugin/reference/html/)를 참조하세요.

**Gradle을 사용하여 'build-info.properties'  속성 제외**

앞에서 설명한 Gradle Task Configuration 변경의 일부로 생성된 `build-info.properties` 파일에서 속성을 제외하는 메커니즘도 변경되었습니다. 이전에는 속성을 `null`로 설정하여 속성을 제외할 수 있었습니다. 이것은 더 이상 작동하지 않으며 이름 기반 메커니즘으로 대체되었습니다.

```groovy
springBoot {
	buildInfo {
		excludes = ['time']
	}
}
```

Gradle Kotlin DSL의 해당 항목은 다음과 같습니다.

```groovy
springBoot {
	buildInfo {
		excludes.set(setOf("time"))
	}
}
```

### **Maven 변경 사항**

Maven으로 Spring Boot 프로젝트를 빌드하는 사용자는 다음 섹션을 검토해야 합니다.

**Maven Process에서 어플리케이션 실행**

Spring Boot 2.7에서 지원 중단되었던 `spring-boot:run` 및 `spring-boot:start`의 `fork` 속성이 삭제되었습니다.

**Git Commit ID Maven Plugin**

Git Commit ID Maven 플러그인이 좌표가 변경된 버전 5로 업데이트되었습니다. 이전 좌표는 `pl.project13.maven:git-commit-id-plugin`이었습니다. 새 좌표는 `io.github.git-commit-id:git-commit-id-maven-plugin`입니다. 그에 따라 `pom.xml` 파일의 모든 `<plugin>` 선언이 업데이트되어야 합니다.

### **Dependency Management 변경 사항**

Spring Boot에서 관리하는 종속성이 다음과 같이 변경되었습니다.

**JSON-B**

Eclipse Yasson을 위해 Apache Johnzon에 대한 종속성 관리가 제거되었습니다. Apache Johnzon의 Jakarta EE 10 호환 버전을 Spring Boot 3과 함께 사용할 수 있지만 이제 종속성 선언에서 버전을 지정해야 합니다.

**ANTLR 2**

ANTLR 2(`antlr:antlr`)에 대한 종속성 관리가 더 이상 필요하지 않으므로 제거되었습니다. 애플리케이션에서 ANTLR 2를 사용하는 경우 필요에 맞는 버전을 지정하십시오.

**RxJava**

RxJava 1.x 및 2.x에 대한 종속성 관리가 제거되고 RxJava 3에 대한 종속성 관리가 대신 추가되었습니다.

**Hazelcast Hibernate 제거됨**

Spring Boot는 Hazelcast Hibernate에 의존하지 않으므로 해당 버전에 대한 의견이 필요하지 않습니다. 따라서 Hazelcast Hibernate에 대한 종속성 관리가 제거되었습니다. Hazelcast Hibernate를 계속 사용하려면 필요에 맞는 버전을 지정하십시오. 또는 대신 `org.hibernate.orm:hibernate-jcache`를 사용하는 것을 고려하세요.

기타 삭제

다음 종속성에 대한 지원이 Spring Boot 3.0에서 제거되었습니다.

- Apache ActiveMQ
- Atomikos
- EhCache 2
- Hazelcast 3

Jetty 기반 클라이언트인 `Http2SolrClient`가 Jetty 11과 호환되지 않으므로 Apache Solr에 대한 지원이 제거되었습니다.