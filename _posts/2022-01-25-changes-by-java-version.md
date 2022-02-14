---
title:  "Java 버전별 변경점 정리"
excerpt: "java 8 버전부터 변경점에 대한 요약정리"
author_profile: true
date: 2022-01-25 09:50:00 +0900
last_modified_at: 2022-01-25 15:50:00 +0900

categories:
- java

tags: [java, version, 변경사항, 버전, 변경점, release, note]
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
동시성 및 병렬 처리 지원을 위한 [CompletableFuture](https://docs.oracle.com/javase/9/docs/api/java/util/concurrent/CompletableFuture.html) API 개선과 publish-subscribe framework 제공

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
참고 : [JDK 10 Documentation](https://docs.oracle.com/javase/10/)

## Optional.orElseThrow()
`Optional.orElseThrow()` 메소드가 추가되었으며, 기존의 `get()` 메소드와 동의어이며 이보다 선호되는 대안

## Unmodifiable Collections 를 만들기 위한 API 추가 
`List.copyOf`, `Set.copyOf`, `Map.copyOf` 추가.
Stream 패키지의 Collectors 클래스에 `toUnmodifiableList`, `toUnmodifiableSet`, `toUnmodifiableMap이` 추가

## Docker 컨테이너에 대한 개선사항
JVM은 Docker 컨테이너에서 실행 중이며 운영 체제를 쿼리하는 대신 컨테이너별 구성 정보를 추출한다는 것을 인식하도록 수정되었습니다. 
추출되는 정보는 컨테이너에 할당된 CPU 및 총 메모리 수 입니다. java 프로세스에서 사용할 수 있는 총 CPU 수는 지정된 CPU 세트, CPU 공유 또는 CPU 할당량에서 계산됩니다. 
이 지원은 Linux 기반 플랫폼에서만 사용할 수 있습니다. 이 새로운 지원은 기본적으로 활성화되며 JVM 옵션을 사용하여 명령줄에서 비활성화할 수 있습니다.
```shell
-XX:-UseContainerSupport
```
또한 이 변경 사항은 JVM이 사용할 CPU 수를 지정하는 기능을 제공하는 JVM 옵션을 추가합니다.
```shell
-XX:ActiveProcessorCount=count
```
이 수는 JVM의 다른 자동 CPU 감지 논리보다 우선합니다.

Docker 컨테이너 사용자가 Java 힙에 사용할 시스템 메모리 양을 보다 세밀하게 제어할 수 있도록 세 가지 새로운 JVM 옵션이 추가되었습니다.
```shell
-XX:InitialRAMPercentage
-XX:MaxRAMPercentage
-XX:MinRAMPercentage
```

## Root Certificates
JDK에서 루트 인증 기관(CA) 인증서의 기본 세트를 제공

## Local-Variable Type Interface
`var`를 사용하여 지역 변수에 대해 타입 추론 기능이 추가. 
```java
var url = new URL("http://www.oracle.com/"); 
var conn = url.openConnection(); 
var reader = new BufferedReader(
    new InputStreamReader(conn.getInputStream()));
```
다음 유형의 변수에 가능.
- initializers 를 사용한 지역 변수 선언
- 향상된 for 루프 인덱스
- 전통적인 for 루프에서 선언된 인덱스 변수
- Try-with-resources variable

```java
var list = new ArrayList<String>();    // infers ArrayList<String>
var stream = list.stream();            // infers Stream<String>

var path = Paths.get(fileName);        // infers Path
var bytes = Files.readAllBytes(path);  // infers bytes[]

for (var counter=0; counter<10; counter++)  {...}   // infers int

try (var input = 
     new FileInputStream ("validation.txt")) {...}   // FileInputStream
```

# Java 11

## Unicode 10.0.0 지원
[Unicode 10.0.0](http://unicode.org/versions/Unicode10.0.0/)

## Local-Variable Syntax for Lambda Parameters
람다식의 매개변수를 선언할 때 var 사용 가능.
```java
@Nonnull var x = new Foo();
(var x, var y) -> x.process(y)
```

## HTTP Client (Standard)
JDK 9에 도입되고 JDK 10에서 업데이트된 HTTP Client API 가 `java.net.http` 패키지로 표준화.
`jdk.incubator.http` 패키지는 제거.

## Collection.toArray(IntFunction) Default Method
새로운 기본 메소드 `toArray(IntFunction)`가 `java.util.Collection` 인터페이스에 추가되었습니다. 이 메서드를 사용하면 컬렉션의 요소를 원하는 런타임 유형의 새로 생성된 배열로 전송할 수 있습니다.

## ZGC A Scalable Low-Latency Garbage Collector (Experimental)
ZGC라고도 하는 Z Garbage Collector는 확장 가능한 저지연 가비지 수집기(JEP 333)입니다. 다음 목표를 충족하도록 설계되었습니다.
- 일시 중지 시간은 10ms를 초과하지 않습니다.
- 힙 또는 라이브 세트 크기에 따라 일시 중지 시간이 증가하지 않습니다.
- 수백 메가바이트에서 수 테라바이트 크기의 힙 처리

ZGC는 동시 가비지 수집기입니다. java 스레드가 계속 실행되는 동안 모든 무거운 작업(마킹, 압축, 참조 처리, 문자열 테이블 정리 등)이 수행됩니다. 이는 가비지 수집이 애플리케이션 응답 시간에 미치는 부정적인 영향을 크게 제한합니다.

ZGC의 이 실험 버전에는 다음과 같은 제한 사항이 있습니다.

- Linux/x64에서만 사용할 수 있습니다.
- 압축된 oops 및/또는 압축된 클래스 포인트 사용은 지원되지 않습니다. ```-XX:+UseCompressedOops``` 및 ```-XX:+UseCompressedClassPointers``` 옵션은 기본적으로 비활성화되어 있습니다. 활성화해도 효과가 없습니다.
- 클래스 언로드는 지원되지 않습니다. ```-XX:+ClassUnloading``` ```-XX:+ClassUnloadingWithConcurrentMark``` 옵션은 기본적으로 비활성화되어 있습니다. 활성화해도 효과가 없습니다.
- Graal과 함께 ZGC를 사용하는 것은 지원되지 않습니다.

## Lazy Allocation of Compiler Threads
컴파일러 스레드를 동적으로 제어하기 위해 새 명령줄 플래그 `-XX:+UseDynamicNumberOfCompilerThreads` 가 추가되었습니다.

## ChaCha20 and Poly1305 Cryptographic Algorithms
RFC 7539에 지정된 대로 ChaCha20 및 ChaCha20-Poly1305 암호를 구현합니다. ChaCha20은 이전의 안전하지 않은 RC4 스트림 암호를 대체할 수 있는 최신 스트림 암호입니다.

## Transport Layer Security (TLS) 1.3
JDK 11 릴리스에는 TLS(전송 계층 보안) 1.3 사양(RFC 8446) 구현이 포함되어 있습니다. 지원되는 기능 목록을 포함한 자세한 내용은 JSSE(Java Secure Socket Extension) 참조 가이드 문서 및 JEP 332를 참조하십시오 .

TLS 1.3의 경우 다음과 같은 새로운 표준 알고리즘 이름이 정의됩니다.

1. TLS 프로토콜 버전 이름: TLSv1.3
2. SSLContext 알고리즘 이름: TLSv1.3
3. TLS 1.3용 TLS 암호 제품군 이름: TLS_AES_128_GCM_SHA256, TLS_AES_256_GCM_SHA384
4. X509KeyManager용 키 유형: RSASSA-PSS
5. X509TrustManager용 인증 유형: RSASSA-PSS

## Local-Variable Syntax for Lambda Parameters
람다식의 형식 매개변수를 선언할 때 `var`를 사용할 수 있습니다.
```java
(var x, var y) -> x.process(y)
```

## Launch Single-File Source-Code Programs
"shebang" 파일 및 관련 기술을 통해 스크립트 내에서 사용하는 것을 포함하여 Java 소스 코드의 단일 파일로 제공되는 프로그램을 실행하도록 Java 실행기를 향상시킵니다.
```bash
#!/opt/java/jdk-11/bin/java --source 11
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

# Java 12
**작성 예정**

# Java 13
**작성 예정**

# Java 14
**작성 예정**

# Java 15
**작성 예정**

# Java 16
**작성 예정**