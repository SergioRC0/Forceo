import React from 'react'

export default function Footer() {
  return (
    <div>
      <footer className="bg-mycolor-custom py-7 px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-400 border-gray-200">
        <div className="flex gap-3 justify-center">
          <span className="">X</span>
          <span className="">📷</span>
          <span>🎥</span>
          <span>🔗</span>
        </div>
        <div className="text-center space-y-3">
          <p className="font-bold">Use cases</p>
          <p>UI design</p>
          <p>UX design</p>
          <p>Wireframing</p>
          <p>Diagramming</p>
        </div>
        <div className="text-center space-y-3">
          <p className="font-bold">Resources</p>
          <p>Blog</p>
          <p>Colors</p>
          <p>Support</p>
          <p>Developers</p>
        </div>
      </footer>
    </div>
  )
}
