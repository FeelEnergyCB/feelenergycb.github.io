import { glitchText } from "./glitchText";
import def from "./engine";
import "./index.scss"

const prepareGlitchText = () => {
  document.querySelectorAll('.js-glitch').forEach((value) => {
    glitchText(value.innerHTML, (res) => { value.innerHTML = res })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.add('loaded');
  let activeMenu = 'main'

  const menu = document.getElementById('menu')
  const canvas = document.getElementById('canvas')
  const mainSection = document.getElementById('main')
  const aboutSection = document.getElementById('about')
  const projectsSection = document.getElementById('projects')
  const contactsSection = document.getElementById('contacts')

  menu.addEventListener('click', (e: MouseEvent) => {
    const selectedSection = (e.target as HTMLElement)?.dataset?.to
    if (!selectedSection) return
    window.scrollTo({
      top: document.getElementById(selectedSection).offsetTop,
      left: 0,
      behavior: 'smooth'
    })
  })

  const selectActiveMenu = (section: string) => {
    menu.querySelectorAll('li').forEach(value => value.classList.remove('active'))
    menu.querySelector('a[data-to="' + section + '"]')?.closest('li')?.classList.add('active')
  }

  const handleScroll = () => {
    const scrollTop = window.scrollY
    console.log('scrollTop', scrollTop)

    if (scrollTop >= contactsSection.offsetTop) {
      activeMenu = 'contacts'
    } else if (scrollTop >= projectsSection.offsetTop) {
      activeMenu = 'projects'
    } else if (scrollTop >= aboutSection.offsetTop) {
      activeMenu = 'about'
    } else if (scrollTop >= mainSection.offsetTop) {
      activeMenu = 'main'
    }

    selectActiveMenu(activeMenu)
  }

  handleScroll()

  document.addEventListener('scroll', handleScroll, { passive: true })

  prepareGlitchText();


  // def.scene.debugLayer.show({
  //   embedMode: true,
  // });

  def.engine.runRenderLoop( () => {
    def.scene.render();
  })

  // window.addEventListener('resize', () => {
  //   def.engine.resize();
  // });
});