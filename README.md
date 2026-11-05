# English Portal - PC versiyası (Windows)

Electron əsaslı tətbiq. `site/` qovluğunda saytın v24 versiyası var.

## İki rejim (`config.json`)
- `"mode": "remote"` (standart): tətbiq `url` ünvanındakı canlı saytı açır. Sayt Firebase-ə deploy olunanda PC tətbiqi **avtomatik yenilənir**, yenidən `.exe` yığmaq lazım deyil.
- `"mode": "local"`: tətbiq `site/` qovluğunu özü içindən (127.0.0.1) açır. Sayt dəyişəndə `site/` qovluğunu yeniləyib `.exe`-ni yenidən yığmaq lazımdır.

İnternet olmayanda "İnternet yoxdur" səhifəsi açılır və bağlantı qayıdanda tətbiq özü davam edir.

## GitHub-da .exe yığmaq
1. Bu qovluğun məzmununu GitHub reposuna yüklə.
2. `git tag v1.0.0 && git push origin v1.0.0` (və ya Actions tab-ından "Build Windows app" workflow-nu əl ilə işə sal).
3. Bitəndə `.exe` faylları **Actions → artifact** və ya **Releases** bölməsində olur (quraşdırıcı və portable).

## Kompüterdə sınamaq
```
npm install
npm start
```
