export function convertToYoutubeEmbed(url: string): string | null {
  if (!url) return null

  let videoId: string | null = null

  const regexNormal = /(?:youtube\.com\/watch\?v=|youtube\.com\/watch\?.+&v=)([^&]+)/
  const regexShort = /youtu\.be\/([^?&]+)/
  const regexShorts = /youtube\.com\/shorts\/([^?&]+)/

  const matchNormal = url.match(regexNormal)
  const matchShort = url.match(regexShort)
  const matchShorts = url.match(regexShorts)

  if (matchNormal && matchNormal[1]) {
    videoId = matchNormal[1]
  } else if (matchShort && matchShort[1]) {
    videoId = matchShort[1]
  } else if (matchShorts && matchShorts[1]) {
    videoId = matchShorts[1]
  }

  if (videoId) {
    return `https://www.youtube.com/embed/${videoId}`
  }

  return null
}
