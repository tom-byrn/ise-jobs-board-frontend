export const WickedLink = ({ url, text, icon }: { url: string, text: string, icon: React.ReactNode }) => {
  return (
    <a
      href={url}
      target="_blank"
      className={`
                  ${(url == null || url.trim() == "") ? "hidden" : "block"}
                  flex flex-row text-sm items-center px-4 gap-x-2 cursor-pointer rounded-sm border-2 border-black p-2
                  hover:bg-black hover:text-white transition-all duration-200
		`}
    >
      {icon} {text}
    </a>
  )
}
