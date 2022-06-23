import React from 'react'

const ProjectCard = ({ project, onOpenProjectModal }) => {
  return (
    <img
      onClick={() => onOpenProjectModal(project)}
      className="m-3 block max-h-[200px] max-w-[100px] cursor-pointer sm:mx-10 sm:my-5 sm:max-w-[200px] sm:max-w-xs"
      src={project.thumbnail.url}
      alt={project.thumbnail.filename}
    />
  )
}

export default ProjectCard
