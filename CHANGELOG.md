# [1.1.0](https://github.com/Howard86/github-search/compare/v1.0.0...v1.1.0) (2021-01-29)


### Bug Fixes

* cleanup search page with useReducer and updated global store ([7422947](https://github.com/Howard86/github-search/commit/7422947b07de4882acf1a9f418d07d13eefecfa1))
* remove animation when adding url queries ([7d456d1](https://github.com/Howard86/github-search/commit/7d456d1ae3c1f90ac97f085e587688d8be48c8d1))
* unnecessary retry on github getUser ([147bc92](https://github.com/Howard86/github-search/commit/147bc92da0682cde5c0931087516794a0053a089))


### Features

* add SearchPage, refactoring from HomePage ([4636831](https://github.com/Howard86/github-search/commit/463683172cdd52c5d5c9c23de3851643164c3ca3))



# [1.0.0](https://github.com/Howard86/github-search/compare/v0.4.0...v1.0.0) (2021-01-27)


### Bug Fixes

* cache ttl units ([f731561](https://github.com/Howard86/github-search/commit/f7315611897cbe0c46917c29f39e79bdcf9c1a66))
* enable prefetch with new API endpoint ([68d0707](https://github.com/Howard86/github-search/commit/68d0707e34521da6ffdf74d8b9f73eb5c6cb5e05))
* missing HomePage styles ([38dfcc4](https://github.com/Howard86/github-search/commit/38dfcc48642684a5c6d6b8c4033d21813b516faf))


### Features

* add AppCache and UserService ([0968bc1](https://github.com/Howard86/github-search/commit/0968bc1a31ee31d35b6eeada21de3bfab89f1cc2))
* add generic cache class ([194af3f](https://github.com/Howard86/github-search/commit/194af3fa5d8a5a380596b9e3bda3c7ee4c6dac2e))
* add server/model to types and query ([09cc401](https://github.com/Howard86/github-search/commit/09cc4015e7074643c40aa539933d66f4c8c632bc))
* migrate getUserByUsername with single gql request ([39c231f](https://github.com/Howard86/github-search/commit/39c231fc03d6101721154bc0cdf64b173e3e55fb))
* refactor Profile with new API and add ProfileBadge ([0e1d479](https://github.com/Howard86/github-search/commit/0e1d479a74da7ba28713bf50ecae6468f5cbf501))



# [0.4.0](https://github.com/Howard86/github-search/compare/v0.3.0...v0.4.0) (2021-01-26)


### Bug Fixes

* disable prefetch github user ([f6a7f73](https://github.com/Howard86/github-search/commit/f6a7f73f899b57b6a8f2f7f8db4cc8e97ff9a205))
* minor styling issues ([97f3d90](https://github.com/Howard86/github-search/commit/97f3d90ef0bd77add0eb7643609d83a715aa5af9))
* quick fix follower & following response ([01fe6b2](https://github.com/Howard86/github-search/commit/01fe6b2865931997d3a7991259af40193873bca1))
* remove SearchBar and fix HomePage styling ([192501e](https://github.com/Howard86/github-search/commit/192501e1eb83e8c4f786386341e11b586f981471))
* test next/image with missing env and mock next/router ([dfaf4dd](https://github.com/Howard86/github-search/commit/dfaf4dd7d74ce6d159a850e372ecdd7486a2fd0f))
* update based on LightHouse scores ([46dc951](https://github.com/Howard86/github-search/commit/46dc951d76e82cf263da882ee5a2c0d661f0a62f))
* update page types with NextPage ([1058f4d](https://github.com/Howard86/github-search/commit/1058f4dd6fae3b946e6eef6b8238bf5d1ac7d816))


### Features

* add dark mode and ColorModeSwitch ([ea14660](https://github.com/Howard86/github-search/commit/ea146609fa6d7f164406682718efb6d4abd4565f))
* add InfoList ([5b63902](https://github.com/Howard86/github-search/commit/5b6390240d4f24798dc484d1a58b5b05990a6ddb))
* add Layout in _app ([0bc75c4](https://github.com/Howard86/github-search/commit/0bc75c4fce065074434d622d88c14160964c0337))
* add page transition in Layout ([3e9df1a](https://github.com/Howard86/github-search/commit/3e9df1a7bbdc0ba61ed5d6420b0c249e05cc2c86))
* add Profile & ProfileField ([225b223](https://github.com/Howard86/github-search/commit/225b223a0a531fceeafd84b70a93f5f0a761d4af))
* improve SEO and update favicon ([ea2e75c](https://github.com/Howard86/github-search/commit/ea2e75c569ea2c90667281dbb763b65dddb50bc0))
* update user page with Profile & Tabs ([272994d](https://github.com/Howard86/github-search/commit/272994dca1bbc694b0176eb9e85ea0ee5d62a5f7))



# [0.3.0](https://github.com/Howard86/github-search/compare/v0.2.0...v0.3.0) (2021-01-24)


### Bug Fixes

* github retry override ([09def48](https://github.com/Howard86/github-search/commit/09def48ef811bba633a279eecd1c9abe92eaa301))
* incorrect error message on SearchBar ([bf57b4e](https://github.com/Howard86/github-search/commit/bf57b4e6a86cfd47718b4aefa509fa46694fb539))


### Features

* add GET follow/[username] API ([8565a8c](https://github.com/Howard86/github-search/commit/8565a8c4b754a8bff82b6f4ac0c7a3111d07eb1e))
* add user page dynamic generate and cache ([509fa41](https://github.com/Howard86/github-search/commit/509fa4112124a4cfd3eb45bd6c37142f8068f711))
* add UserFollowLabel in UserCard ([327f532](https://github.com/Howard86/github-search/commit/327f53258af664159befc29a719010fdde372a14))
* add useUserFollow hook to async fetch follow data ([dd08167](https://github.com/Howard86/github-search/commit/dd08167e129896f8d13c0df72174340ee2fc2816))
* improve performace with debounce and memo ([185305f](https://github.com/Howard86/github-search/commit/185305f6eba6d3b2415ac654ee4ce1412c0a68a1))
* refactor github service with updated types ([33f0eb4](https://github.com/Howard86/github-search/commit/33f0eb4f632e09b04891b561cc4603015f29576d))
* refactor user service and add cache ([4362344](https://github.com/Howard86/github-search/commit/4362344c723d38862a4cfb9d2a6142288c03bd9a))



# [0.2.0](https://github.com/Howard86/github-search/compare/v0.1.0...v0.2.0) (2021-01-22)


### Bug Fixes

* unfound username from github ([f745dbb](https://github.com/Howard86/github-search/commit/f745dbbb414bdae120ba4e853995724cbb8b8c00))
* update UserCard styles ([0f37736](https://github.com/Howard86/github-search/commit/0f3773671d2f4a84c2e1df79e4cec8a59c889b86))
* UserCard test ([959245a](https://github.com/Howard86/github-search/commit/959245aa03f0617c8e510c49aec6e79fcf9dfb6b))


### Features

* add custom progress Loader ([5f2e42d](https://github.com/Howard86/github-search/commit/5f2e42dafba7ecbdb47bbadd5ea6f6e1867c09ca))
* add GET /users & /users/[username] API ([5a5fbbb](https://github.com/Howard86/github-search/commit/5a5fbbb817ab54ef8b814b30c60002f45bbcab9f))
* add github user service ([3a2ba2c](https://github.com/Howard86/github-search/commit/3a2ba2ca0bba2cd2487540e5ba7001802fa2a229))
* add pagination from user API ([f6d55f7](https://github.com/Howard86/github-search/commit/f6d55f7c430aeed39fa8aa62ba72759b0eac5159))
* add SearchBar ([f3f4916](https://github.com/Howard86/github-search/commit/f3f491681ba59ec6c837d6c8d30a24966f680e77))
* add user repos, followers & followings ([13b0482](https://github.com/Howard86/github-search/commit/13b0482e25f0ba7a3f04ab8ff88f7ca0e09a3446))
* add user store for search and single get ([0e7ac59](https://github.com/Howard86/github-search/commit/0e7ac59b12cc372d48c5a003662be25e7a81961a))
* add UserCard ([c56b71c](https://github.com/Howard86/github-search/commit/c56b71cdabb60671ec60cbe80cfe1cfb65054f80))
* add UserPage with dynamic username ([b31fd66](https://github.com/Howard86/github-search/commit/b31fd66080505b16683466022722c4e3197b3fa0))
* update HomePage ([34365f0](https://github.com/Howard86/github-search/commit/34365f05a788556b1d83795a759ecc7ee31c931b))
* update SearchBar with PaginationButton ([33223e7](https://github.com/Howard86/github-search/commit/33223e76ee7df05b720b2aa9029e71480c6857ff))



# 0.1.0 (2021-01-08)


### Features

* add ChakraProvider ([e99eed5](https://github.com/Howard86/conference-call/commit/e99eed5fb441f274c6f9e5902df00844d8276a4e))
* add CircleCI config ([a3140a4](https://github.com/Howard86/conference-call/commit/a3140a4f139f66a05320a421696bc9ee9639d84d))
* add npm run debug with vscode config ([1afdfff](https://github.com/Howard86/conference-call/commit/1afdfff632e579252a79c416ccc9727597bb0a72))
* set up npm test with jest ([7f40d92](https://github.com/Howard86/conference-call/commit/7f40d9205a310224c8ede8cd77b13a28c6918dc4))
* set up redux store ([9f61a54](https://github.com/Howard86/conference-call/commit/9f61a542164365d37cc898cd142ed2d089a988fb))



