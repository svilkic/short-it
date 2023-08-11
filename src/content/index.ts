import './reelupstyles.css'

const activeReelClass = 'ytd-reel-video-renderer[is-active]'
const controlsContainerClass = 'custom-video-controls'

const muteSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-mute-fill" viewBox="0 0 16 16"> <path d="M6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06zm7.137 2.096a.5.5 0 0 1 0 .708L12.207 8l1.647 1.646a.5.5 0 0 1-.708.708L11.5 8.707l-1.646 1.647a.5.5 0 0 1-.708-.708L10.793 8 9.146 6.354a.5.5 0 1 1 .708-.708L11.5 7.293l1.646-1.647a.5.5 0 0 1 .708 0z"/> </svg>'

const soundSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-volume-up-fill" viewBox="0 0 16 16"> <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/> <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/> <path d="M8.707 11.182A4.486 4.486 0 0 0 10.025 8a4.486 4.486 0 0 0-1.318-3.182L8 5.525A3.489 3.489 0 0 1 9.025 8 3.49 3.49 0 0 1 8 10.475l.707.707zM6.717 3.55A.5.5 0 0 1 7 4v8a.5.5 0 0 1-.812.39L3.825 10.5H1.5A.5.5 0 0 1 1 10V6a.5.5 0 0 1 .5-.5h2.325l2.363-1.89a.5.5 0 0 1 .529-.06z"/> </svg>'

const playSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/> </svg>'

const pauseSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16"> <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"/> </svg>'

const forwardSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-forward-fill" viewBox="0 0 16 16"> <path d="M15.5 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V8.753l-6.267 3.636c-.54.313-1.233-.066-1.233-.697v-2.94l-6.267 3.636C.693 12.703 0 12.324 0 11.693V4.308c0-.63.693-1.01 1.233-.696L7.5 7.248v-2.94c0-.63.693-1.01 1.233-.696L15 7.248V4a.5.5 0 0 1 .5-.5z"/> </svg>'

const backwardSvg =
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-skip-backward-fill" viewBox="0 0 16 16"> <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"/> </svg>'

chrome.runtime.onMessage.addListener(function (request) {
  if (request.action === 'executeScript' && request.url) {
    console.log('URL changed to:', request.url)
    waitForElementToLoad(activeReelClass + ' video', waitForVideoToAppear)
  }
})

function waitForVideoToAppear() {
  waitForElementToLoad(activeReelClass, AddControls)
}

var videoElement: HTMLVideoElement | null = null

// Wait for element to load, when it's loaded execute callback function
function waitForElementToLoad(selector: string, callback: (element: Element) => any) {
  console.log('Waiting for element [ ' + selector + ' ] to load')
  const element = document.querySelector(selector)
  if (element) {
    callback(element)
  } else {
    setTimeout(() => waitForElementToLoad(selector, callback), 100)
  }
  // const observer = new MutationObserver(function (mutations) {
  //   mutations.forEach(function (mutation) {
  //     if (mutation.type === 'childList' && mutation.addedNodes.length) {
  //       const matchingElement = Array.from(mutation.addedNodes).find(
  //         (node) => node instanceof Element && node.matches(selector),
  //       )
  //       if (matchingElement) {
  //         observer.disconnect()
  //         callback(matchingElement as HTMLElement)
  //       }
  //     }
  //   })
  // })

  // observer.observe(document.body, { childList: true, subtree: true })
}

// function waitForElement(selector: string) {
//   return new Promise((resolve) => {
//     const observer = new MutationObserver(function (mutations) {
//       mutations.forEach(function (mutation) {
//         if (mutation.type === 'childList' && mutation.addedNodes.length) {
//           const matchingElement = Array.from(mutation.addedNodes).find(
//             (node) => node instanceof Element && node.matches(selector),
//           )
//           if (matchingElement) {
//             observer.disconnect()
//             resolve(matchingElement)
//           }
//         }
//       })
//     })

//     observer.observe(document.body, { childList: true, subtree: true })
//   })
// }

waitForElementToLoad(activeReelClass + ' video', waitForVideoToAppear)

function AddControls(element: Element) {
  const reelElement = element as HTMLElement
  if (reelElement) {
    // Check if video controls already exist
    const controls = checkIfControlsExist(reelElement)
    if (controls !== null) {
      console.log('Controls exist delete them')
      controls.innerHTML = ''
    }

    const videoElement = reelElement.querySelector('video') as HTMLVideoElement
    // waitForElementToLoad(
    //   activeReelClass + ' video',
    //   (video) => (videoElement = video as HTMLVideoElement),
    // )

    const controlContainer = createControlContainer()
    console.log(videoElement + ' ')
    if (videoElement) {
      createButtonContainer(controlContainer, videoElement)
      createVolumeSlider(controlContainer, videoElement)
      createProgressBar(controlContainer, videoElement)

      reelElement.appendChild(controlContainer)
    }
    console.log(element)
  }
}

function checkIfControlsExist(videoContainer: HTMLElement) {
  const existingControls = videoContainer.querySelector(`.${controlsContainerClass}`)
  return existingControls
}

function createControlContainer() {
  const controlsContainer = document.createElement('div')
  controlsContainer.className = controlsContainerClass
  return controlsContainer
}

function createButtonContainer(controlsContainer: HTMLElement, video: HTMLVideoElement): void {
  const buttonsContainer = document.createElement('div')
  buttonsContainer.className = 'buttons-container'

  createButton(buttonsContainer, 'Rewind', backwardSvg, () => {
    video.currentTime -= 5
  })

  createButton(buttonsContainer, 'Play/Pause', playSvg, () => {
    if (video.paused) {
      video.play()
    } else {
      video.pause()
    }
  })

  createButton(buttonsContainer, 'Forward', forwardSvg, () => {
    video.currentTime += 5
  })

  controlsContainer.appendChild(buttonsContainer)
}

function createButton(
  controlsContainer: HTMLElement,
  text: string,
  imageSrc: string,
  clickHandler: () => void,
): void {
  const button = document.createElement('button')

  if (imageSrc) {
    const img = document.createElement('img')
    img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(imageSrc)
    img.alt = text // You can set the alt text to the button text or any other descriptive text
    button.appendChild(img)
  }
  // if (text) button.appendChild(document.createTextNode(text)) // Adding a text node after the image

  button.onclick = clickHandler
  if (text) button.classList.add(text) // You can set the alt text to the button text or any other descriptive text

  controlsContainer.appendChild(button)
}

function createVolumeSlider(controlsContainer: HTMLElement, video: HTMLVideoElement): void {
  const volumeSlider = document.createElement('input')
  volumeSlider.className = 'custom-volume-bar'
  volumeSlider.type = 'range'
  volumeSlider.min = '0'
  volumeSlider.max = '1'
  volumeSlider.step = '0.01'

  chrome.storage.local.get('lastVolume', function (result) {
    const savedVolume = result.lastVolume >= 0 ? result.lastVolume : 0.5 // Default volume if not set
    video.volume = parseFloat(savedVolume)
    volumeSlider.value = savedVolume.toString()
  })

  volumeSlider.addEventListener('input', () => {
    const volumeValue = parseFloat(volumeSlider.value)
    video.volume = volumeValue
    chrome.storage.local.set({ lastVolume: volumeValue }, function () {})
  })

  controlsContainer.appendChild(volumeSlider)
}

function createProgressBar(controlsContainer: HTMLElement, video: HTMLVideoElement): void {
  const progressBar = document.createElement('div')
  progressBar.className = 'custom-progress-bar'

  const slider = document.createElement('input')
  slider.type = 'range'
  slider.min = '0'
  slider.max = video.duration.toString()
  slider.value = '0'

  slider.addEventListener('input', () => {
    video.currentTime = parseFloat(slider.value)
  })

  progressBar.appendChild(slider)

  // Update the slider value as the video progresses
  video.ontimeupdate = (event) => {
    // console.log('The currentTime attribute has been updated. Again.')
    slider.value = video.currentTime.toString()
    slider.max = video.duration.toString()
  }
  controlsContainer.appendChild(progressBar)
}

export {}
