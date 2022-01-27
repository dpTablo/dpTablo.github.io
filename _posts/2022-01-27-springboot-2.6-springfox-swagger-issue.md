---
title:  "spring boot 2.6 에서 springfox swagger 3.0.0 사용 이슈"
excerpt: "spring boot 2.6 에서 springfox swagger 3.0.0 dependency 추가 후의 어플리케이션 구동 이슈"
author_profile: true
date: 2022-01-27 15:03:00 +0900
last_modified_at: 2022-01-27 15:03:00 +0900

categories:
- spring
- spring boot
- springfox
- swagger

tags: [spring, spring boot, springfox, swagger, api, ]
---

# 이슈내용
spring boot 2.6.3 에서 `io.springfox:springfox-boot-starter:3.0.0` 을 적용 후 spring boot 를 구동하면 Exception 이 발생합니다.
```shell
org.springframework.context.ApplicationContextException: Failed to start bean 'documentationPluginsBootstrapper'; nested exception is java.lang.NullPointerException
```

# spring boot 2.6 의 변경사항
[Spring-Boot-2.6-Release-Notes](https://github.com/spring-projects/spring-boot/wiki/Spring-Boot-2.6-Release-Notes#pathpattern-based-path-matching-strategy-for-spring-mvc) 의 PathPattern Based Path Matching Strategy for Spring MVC 부분에 아래 내용이 있습니다.

spring mvc handler mapping 의 기본 전략이 [AntPathMatcher](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/util/AntPathMatcher.html) 에서 [PathPatternParser](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/web/util/pattern/PathPatternParser.html) 로 변경되었습니다.

Actuator 및 Springfox 를 사용할 때 `PathPatternParser` 를 사용하게 되면 어플리케이션 구동 시에 문제가 있을 수 있다는 내용이 있습니다.

> PathPattern Based Path Matching Strategy for Spring MVC
>
> The default strategy for matching request paths against registered Spring MVC handler mappings has changed from AntPathMatcher to PathPatternParser.
>
> If you are using Spring Security, you should review your use of mvcMatchers to ensure that your matchers continue to meet your needs. With AntPathMatcher, authorizeRequests.mvcMatchers("hello").permitAll() would grant access to /hello. The more precise matching of PathPatternParser requires the use of authorizeRequests.mvcMatchers("/hello").permitAll() (note the leading /) instead.
>
> If you need to switch the default back to AntPathMatcher, you can set spring.mvc.pathmatch.matching-strategy to ant-path-matcher.
>
> The actuator endpoints now also use PathPattern based URL matching. Note that the path matching strategy for actuator endpoints is not configurable via a configuration property. If you are using Actuator and Springfox, this may result in your application failing to start. Please see this Springfox issue for further details.

## 번역
등록된 Spring MVC handler mapping에 대해 request path를 일치시키는 기본 전략이 `AntPathMatcher`에서 `PathPatternParser`로 변경되었습니다.

Spring Security를 사용하는 경우 `mvcMatchers` 사용을 검토하여 Matcher가 계속해서 요구 사항을 충족하는지 확인해야 합니다. `AntPathMatcher`를 사용하면 `authorizeRequests.mvcMatchers("hello").permitAll()`이 `/hello`에 대한 액세스 권한을 부여합니다. `PathPatternParser`를 보다 정확하게 일치시키려면 대신 `authorizeRequests.mvcMatchers("/hello").permitAll()` 을 사용해야 합니다.

기본값을 `AntPathMatcher`로 다시 전환해야 하는 경우 `spring.mvc.pathmatch.matching-strategy`를 `ant-path-matcher`로 설정할 수 있습니다.

Actuator 엔드포인트는 이제 PathPattern 기반 URL 일치도 사용합니다. Actuator 엔드포인트에 대한 path 일치 전략은 configuration property를 통해 구성할 수 없습니다. Actuator 및 Springfox를 사용하는 경우 애플리케이션이 시작되지 않을 수 있습니다. 자세한 내용은 [Spring 5.3/Spring Boot 2.4 support #3462](https://github.com/springfox/springfox/issues/3462) 를 참조하세요.

# 해결방안

저의 경우 spring 2.6.3 이었으며 이 문제가 동일하게 발생하였습니다. 

[Spring 5.3/Spring Boot 2.4 support #3462](https://github.com/springfox/springfox/issues/3462) 에 내용들을 살펴보니 spring boot 2.6, swagger 3.0.0 을 사용할 때 이 문제가 발생하는 것으로 많은 사람들이 의견을 나누고 있습니다. 크게 두가지 정도로 임시조치를 할 수 있습니다.

## spring mvc handler mapping 전략을 AntPathMatcher 로 변경하는 방법
application.yml 설정에서 matching-strategy 을 `ant_path_matcher` 로 변경하는 것입니다.

```yaml
spring:
  mvc:
    pathmatch:
      matching-strategy: ant_path_matcher
```

## Swagger Configuration 에 Bean 을 추가하여 처리하는 방법
github issue 에서 여러 의견 중 [maxxedev](https://github.com/maxxedev)님의 코드를 적용한 결과 문제가 해결되었습니다. 코드 코멘트 링크는 [3462#issuecomment-983144080](https://github.com/springfox/springfox/issues/3462#issuecomment-983144080) 입니다.
```java
@Configuration
public class SpringFoxConfig {
    // ...
    
    @Bean
    public static BeanPostProcessor springfoxHandlerProviderBeanPostProcessor() {
        return new BeanPostProcessor() {
            @Override
            public Object postProcessAfterInitialization(Object bean, String beanName)
                  throws BeansException {
                if (bean instanceof WebMvcRequestHandlerProvider 
                    || bean instanceof WebFluxRequestHandlerProvider) {
                    customizeSpringfoxHandlerMappings(getHandlerMappings(bean));
                }
                return bean;
            }
        
            private <T extends RequestMappingInfoHandlerMapping> void customizeSpringfoxHandlerMappings(
                List<T> mappings) {
                List<T> copy =
                    mappings.stream()
                        .filter(mapping -> mapping.getPatternParser() == null)
                        .collect(Collectors.toList());
                mappings.clear();
                mappings.addAll(copy);
            }
        
            @SuppressWarnings("unchecked")
            private List<RequestMappingInfoHandlerMapping> getHandlerMappings(Object bean) {
                try {
                    Field field = ReflectionUtils.findField(bean.getClass(), "handlerMappings");
                    field.setAccessible(true);
                    return (List<RequestMappingInfoHandlerMapping>) field.get(bean);
                } catch (IllegalArgumentException | IllegalAccessException e) {
                    throw new IllegalStateException(e);
                }
            }
        };
    }
    
    // ...
}
```