// http://fuse-box.org/page/getting-started
// https://github.com/skellock/typescript-with-electron-react-kit/blob/master/fuse.ts
import { FuseBox, Sparky } from 'fuse-box'

const OUTPUT_DIR = 'dist'
const PORT = Number(process.env.PORT) || 4444
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

Sparky.task('copy', () => {
  return Sparky.src('renderer/index.html').dest(`${OUTPUT_DIR}/$name`)
})

Sparky.task('bundle', () => {
  const fuse = FuseBox.init({
    homeDir: 'renderer',
    output: `${OUTPUT_DIR}/$name.js`,
    target: 'electron',
    sourceMaps: true,
    tsConfig: '../tsconfig.json',
  })

  const rendererBundle = fuse.bundle('renderer').instructions('> index.tsx')

  if (!IS_PRODUCTION) {
    rendererBundle.watch()
    fuse.dev({ port: PORT, httpServer: false })
    rendererBundle.hmr({ socketURI: 'ws://localhost:4444' })
  }

  fuse.run()
})

Sparky.task('default', ['copy', 'bundle'], () => {
  console.log('SPARKY!')
})
