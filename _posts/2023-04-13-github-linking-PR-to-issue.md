---
title:  "github PR 에 issue 를 연결하는 방법"
excerpt: "github pull request와 issue를 연결하는 방법에 대해 정리한 내용입니다."
author_profile: true
date: 2023-04-13 08:40 +0900
last_modified_at: 2023-04-13 08:40 +0900

categories:
- github
- pr
- issue
- issue-tracking

tags: [github, pr, pull request, issue, issue-tracking, link]
---
# github PR 작성시 issue 를 연결하는 방법
PR 메세지에 issue 연결 키워드를 작성하시면 됩니다. 연결이 올바르게 되면 PR 화면내의 Deployment에 연결된 issue 정보가 표시됩니다.
![]({{ site.url }}{{ site.baseurl }}/assets/images/posts/github-linking-PR-to-issue/01.png)

# commit 메세지를 통해 issue 를 연결하는 방법
commit 메세지에 issue 연결 키워드를 작성합니다. 내용은 1번과 같습니다.

# issue 등록 시 사이드바의 메뉴를 이용하기
오른쪽 사이드바에 development 메뉴가 있습니다. 이 부분에서 pull request 가 포함된 저장소와 그 저장소에 연결하려는 branch 를 선택할 수 있습니다. 브랜치를 생성할 수도 있습니다.
![]({{ site.url }}{{ site.baseurl }}/assets/images/posts/github-linking-PR-to-issue/02.png)

# github docs
<https://docs.github.com/en/issues/tracking-your-work-with-issues/linking-a-pull-request-to-an-issue>