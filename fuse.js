// http://fuse-box.org/page/getting-started
// https://github.com/skellock/typescript-with-electron-react-kit/blob/master/fuse.ts
const {
  FuseBox,
  SassPlugin,
  CSSPlugin,
  Sparky,
} = require('fuse-box')

const isProduction = process.env.NODE_ENV === 'production'

Sparky.task('clean', () => {
  Sparky.src('app/dist/*').clean('app/dist')
})

Sparky.task('static', () => {
  return Sparky.src('app/renderer/index.html').dest('app/dist/$name')
})

Sparky.task('bundle', () => {
  const fuse = FuseBox.init({
    homeDir: 'app/renderer',
    output: 'app/dist/js/$name.js',
    target: 'electron',
    cache: !isProduction,
    sourceMaps: true,
    tsConfig: './tsconfig.json',
  })

  const rendererBundle = fuse.bundle('app')
    .instructions('> index.tsx')
    .plugin([
      SassPlugin({
        importer: true,
        sourceMap: !isProduction,
        outputStyle: 'expanded',
        sourceMapEmbed: !isProduction,
      }),
      CSSPlugin(),
    ])

  if (!isProduction) {
    fuse.dev()
    rendererBundle.hmr().watch()
  }

  fuse.run()
})

Sparky.task('default', ['clean', 'static', 'bundle'], () => {
  console.log('SPARKY!')
})
