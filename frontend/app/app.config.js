'use strict';

export default function configuration() {
  function sceDelegateProvider() {
    $sceDelegateProvider.resourceUrlWhitelist([
      "self",
      "https://www.youtube.com/**",
      "https://img.youtube.com/**"
    ]);
  }
}
