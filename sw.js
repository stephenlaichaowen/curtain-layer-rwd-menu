// SW Version
const version = '1.0'

// Static Cache - App Shell
const appAssets = [
  'index.html',  
  'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
  'https://unpkg.com/http-vue-loader',
  'https://unpkg.com/vue-router/dist/vue-router.js',
  'pages/about.vue',
  'pages/contact.vue',
  'pages/home.vue',
  'pages/portfolio.vue',
  'pages/services.vue',
  'router/index.js',
  'style.css'
]

// SW Install
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(`static-${version}`)
      .then(cache => cache.addAll(appAssets))
  )
})

// SW Activate
self.addEventListener('activate', e => {
  // Clean static cache
  let cleaned = caches.keys().then(keys => {
    keys.forEach(key => {
      if (key !== `static-${version}` && key.match('static-')) {
        return caches.delete(key)
      }
    })
  })
  e.waitUntil(cleaned)
})

// SW Fetch
self.addEventListener('fetch', e => {
  // App shell
  if (e.request.url.match(location.origin)) {
    e.respondWith(staticCache(e.request))
  }
})

// Static cache strategy - Cache First / Cache with Network Fallback
const staticCache = req => {
  return caches.match(req).then(cacheRes => {
    
    // Return cached response if found
    if(cacheRes) return cacheRes

    // Fall back to network
    return fetch(req).then(networkRes => {

      // Update cache with new response
      caches.open(`static-${version}`)
      .then(cache => cache.put(req, networkRes))

      // Return Clone of Network Response
      return networkRes.clone()
    })

  })
}