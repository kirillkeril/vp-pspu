// Путь к приложению в котором храниться статика django 
const static_dir = './build/static'
// Путь, относительно static_dir
// В него webpack положит шаблон Vue приложения
const template_path = '../index.html'

module.exports = {
  runtimeCompiler: true,
  // NOTE: set alias via `configureWebpack` or `chainWebpack`
  configureWebpack: {
    resolve: {
      alias: {
        'balm-ui-plus': 'balm-ui/dist/balm-ui-plus.js',
        'balm-ui-css': 'balm-ui/dist/balm-ui.css'
      }
    }
  },
  // Paths
  // Рабочая директория сборки 
  // Я обычно указываю директорию приложения django, которое отвеает за фронт
  outputDir: static_dir, 
  // Куда пойдёт шаблон проекта
  indexPath: template_path,
  // Куда пойдут ассеты (относительно outputDir)
  assetsDir: '', // ассеты храним там же, где и JS/CSS
  // Путь по которому можно достать статику
  // Нужно указать тот, который прописан в STATIC_URL настроек django
  publicPath: '/',
}