---
title:  "JPA - Composite-id class must implement Serializable"
excerpt: "entity 매핑에서의 Composite-id class must implement Serializable Exception"
author_profile: true
date: 2022-03-10 11:25:00 +0900
last_modified_at: 2022-03-10 11:00:00 +0900

categories:
- spring
- spring boot
- jpa
- hibernate
- entity
- mapping
- '@MapsId'

tags: [spring, spring boot, springfox, swagger, api, NullPointerException, documentationPluginsBootstrapper]
---
spring boot 2.6.3, hibernate 5.6.4 환경에서 entity 매핑시의 `Composite-id class must implement Serializable` 예외 발생에 대한 내용입니다. 

# 이슈내용
두 개의 엔티티를 식별관계로 매핑하려고 합니다.
`Athlete`엔티티의 PK `athleteId`는 `Gear`엔티티의 PK, FK로 사용됩니다.

아래 코드로 작성합니다. 

```java
@Entity
public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long athleteId;
}

@Entity
public class Gear {
    @Id
    @OneToOne
    @JoinColumn
    private Athlete athlete;
    
    private String name;
}
```

spring을 실행해보면 아래와 같은 예외가 발생합니다.
```
org.hibernate.MappingException: Composite-id class must implement Serializable: Gear
```

# 해결방안
`@Id`이 선언된 PK 필드를 추가하고, `@MapsId` 어노테이션을 이용한 방법으로 수정합니다.
```java
@Entity
public class Athlete {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long athleteId;
}

@Entity
public class Gear {
    @Id
    private Long athleteId;

    @MapsId
    @OneToOne
    @JoinColumn
    private Athlete athlete;
    
    private String name;
}
```

JPA 2.0 에서 entity가 다대일 또는 일대일 관계에서 식별자를 빌릴 수 있도록 하는 파생 식별자에 대한 지원이 추가되었습니다.
참조 : [Hibernate 5.6 user guide - identifiers-derived](https://docs.jboss.org/hibernate/orm/5.6/userguide/html_single/Hibernate_User_Guide.html#identifiers-derived)