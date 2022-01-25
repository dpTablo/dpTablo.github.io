---
title:  "Java 버전별 변경점 정리"
excerpt: "java 8 버전부터 변경점에 대한 요약정리"
author_profile: true
date: 2022-01-25 09:50:00 +0900
last_modified_at: 2022-01-25 15:50:00 +0900

categories:
- java

tags: [java, version]
---

# Java 8
참고 : [What's New in JDK 8](https://www.oracle.com/java/technologies/javase/8-whats-new.html)

## Functional interface
하나의 추상 메소드를 가지는 인터페이스. `@FunctionalInterface` 어노테이션 제공.
java 람다식에서 함수형 인터페이스 형태로 접근하는 방식 사용.
```java
@FunctionalInterface
interface Square {
    int calculate(int x);
}
```


## Lambda expression
표현식을 사용하여 하나의 메소드 인터페이스를 나타내는 간결한 방법 제공. functional interface의 구현을 제공하는데 사용. 

```java
@FunctionalInterface  
interface Drawable{  
    public void draw();  
}  
  
public class LambdaExpressionExample2 {  
    public static void main(String[] args) {  
        int width = 10;  
          
        // with lambda  
        Drawable d2 = () -> {  
            System.out.println("Drawing "+width);  
        };  
        d2.draw();  
    }  
}  
```

## Default method
인터페이스에서 구현된 메소드를 정의 가능.
```java
public interface MicrosoftMouse {
    default void onClickWindowsButton() { 
        showWindowsMenu();
    }

    void leftClick();
    void rightClick();
}
```

## Stream
Collection을 편리하게 처리하는 `java.util.stream` 패키지의 Stream API 제공.
```java
List<String> myList =
    Arrays.asList("a1", "a2", "b1", "c2", "c1");

myList
    .stream()
    .filter(s -> s.startsWith("c"))
    .map(String::toUpperCase)
    .sorted()
    .forEach(System.out::println);

// C1
// C2
```

## Optional
java null 예외 처리를 위한 [Optional](https://docs.oracle.com/javase/8/docs/api/java/util/Optional.html) wrapper 클래스 제공 

## 새롭게 추가된 날짜 API

## Concurrency
- 동시성 프로그래밍을 위한 클래스와 인터페이스가 `java.util.concurrent` 패키지에 추가
- 새로 추가된 스트림 및 람다식을 기반으로 집계 작업을 지원하는 메소드가 `java.util.concurrent.ConcurrentHashMap` 클래스에 추가
- 확장 가능한 업데이트 가능한 변수를 지원 하기 위해 `java.util.concurrent.atomic` 패키지에 클래스가 추가
- coommon pool 을 지원하기 위한 메소드가 `java.util.concurrent.ForkJoinPool` 클래스에 추가
- read/write 액세스를 제어를 위한 세가지 모드로 기능 기반 잠금을 제공하는 `java.util.concurrent.locks.StampedLock` 클래스가 추가

## Unicode 6.2.0
java 8에서는 [Unicode 6.2.0](https://www.unicode.org/versions/Unicode6.2.0/) 을 지원


# Java 9
참고 : [JDK 9 What's New](https://docs.oracle.com/javase/9/whatsnew/toc.htm)

## jshell
REPL(Read-Eval-Print Loop) 기능 추가. java 코드를 command 에서 바로 실행하고 결과 확인

## Multi-Release JAR Files
jar 파일 형식을 확장하여 클래스 파일의 여러 java 릴리즈별 버전이 단일 아카이브에 공존 가능

## Java Platform Module System
java 플랫폼을 지정 모듈 셋트와 필수 모듈을 포함하는 런타임 이미지 생성 가능 (Java Jigsaw)

## Javadoc 
간소화된 Doclet API, HTML5 Javadoc 출력 생성 지원, Javadoc 검색 상자 제공

## Process API
OS의 프로세스를 제어하고 관리하기 위한 API 개선 (java.lang.Process, java.lang.ProcessHandle)

## Variable Handle
java.util.concurrent.atomic 및 sun.misc.Unsafe 작업에 해당하는 [VarHandle](https://docs.oracle.com/javase/9/docs/api/java/lang/invoke/VarHandle.html) 제공

## Compact String
이전에 String 클래스는 각 문자에 대해 2바이트(16비트)를 사용하여 char 배열에 문자를 저장
새로운 내부 표현은 바이트 배열과 인코딩 플래그 필드로 변경되어 메모리 공간 절약

## More Concurrency Updates
동시성 및 병렬 처리 지원을 위한 (CompletableFuture)[https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/CompletableFuture.html] API 개선과 publish-subscribe framework 제공

## Unicode 8.0
java 8 은 unicode 6.2 를 지원했으며, java 9에서는 [Unicode8.0](http://www.unicode.org/versions/Unicode8.0.0/) 을 지원

## UTF-8 Properties Files
UTF-8 인코딩으로 Properties 파일을 로드

## Convenience Factory Methods for Collections
`List`, `Set`, `Map` 인터페이스의 새로운 정적 팩토리 메소드를 사용하여 immutable 인스턴스 생성

java 8 에서의 코드 
```java
Set<String> set = Collections.unmodifiableSet(
    Stream.of("a", "b", "c").collect(toSet())
);
```

java 9 에서의 코드
```java
Set<String> alphabet = Set.of("a", "b", "c");
```

## Milling Project Coin
- `@SafeVargs` private 인스턴스 메소드에서 허용
- 간결한 `try-with-resource`
<br>아래와 같이 선언되었다고 가정하고
```java
// A final resource
final Resource resource1 = new Resource("resource1");
// An effectively final resource
Resource resource2 = new Resource("resource2");
```
<br>java 7, 8 에서는 새 변수에 선언하여 사용
```java
try (Resource r1 = resource1;
    Resource r2 = resource2) {
    ...
}
```
<br>java 9 에서는 선언할 필요 없음
```java
try (resource1;
     resource2) {
    ...
}
```
- 익명 inner 클래스에 diamond syntax 사용 가능
- private interface 메소드 지원
```java
public interface Macbook {
    private void makeBootSound() {
        ... 
    }
    
    private static void showAppleLogo() {
        ... 
    } 
}
```

# Java 10
참고 : [JDK 10 Release Notes](https://www.oracle.com/java/technologies/javase/10-relnote-issues.html)

## Optional.orElseThrow()
`Optional.orElseThrow()` 메소드가 추가되었으며, 기존의 `get()` 메소드와 동의어이며 이보다 선호되는 대안

## Unmodifiable Collections 를 만들기 위한 API 추가 
`List.copyOf`, `Set.copyOf`, `Map.copyOf` 추가.
Stream 패키지의 Collectors 클래스에 `toUnmodifiableList`, `toUnmodifiableSet`, `toUnmodifiableMap이` 추가

# Java 11
**계속 정리 예정중입니다**

# Java 12
**계속 정리 예정중입니다**

# Java 13
**계속 정리 예정중입니다**

# Java 14
**계속 정리 예정중입니다**

# Java 15
**계속 정리 예정중입니다**

# Java 16
**계속 정리 예정중입니다**