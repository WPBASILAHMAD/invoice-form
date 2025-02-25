document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".astra-section")
  const navLinks = document.querySelectorAll(".astra-nav a")

  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active")
        updateNavigation(entry.target.id)
      }
    })
  }, observerOptions)

  sections.forEach((section) => {
    observer.observe(section)
  })

  function updateNavigation(currentId) {
    navLinks.forEach((link) => {
      if (link.getAttribute("href").slice(1) === currentId) {
        link.style.color = "var(--accent-color-1)"
      } else {
        link.style.color = "var(--text-color)"
      }
    })
  }

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href").slice(1)
      const targetSection = document.getElementById(targetId)
      targetSection.scrollIntoView({ behavior: "smooth" })
    })
  })

  // Animate features on scroll
  const features = document.querySelectorAll(".astra-feature")
  features.forEach((feature, index) => {
    feature.style.transitionDelay = `${index * 0.1}s`
  })
})

