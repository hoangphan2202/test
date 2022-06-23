import React, { useState } from 'react'
import useI18n from '../../../hooks/use-i18n'
import Container from '../../../components/Container/Container'
import ProjectCard from './ProjectCard'
import ModalProjectDetail from './ModalProjectDetail'

const defaultOpenProjectDetail = {
  open: false,
  project: undefined,
}

const Projects = ({ data }) => {
  const i18n = useI18n()
  const [openProjectDetail, setOpenProjectDetail] = useState(defaultOpenProjectDetail)

  const handleCloseProjectModal = () => setOpenProjectDetail(defaultOpenProjectDetail)

  const handleOpenProjectModal = (project) =>
    setOpenProjectDetail({
      open: true,
      project,
    })

  return (
    <Container className="mt-16">
      <ModalProjectDetail
        open={openProjectDetail.open}
        project={openProjectDetail.project}
        onClose={handleCloseProjectModal}
      />
      <div className="relative ml-[4%]">
        <img
          alt="bg-title"
          src="/images/layout/bg-only-title.png"
          className="mx-auto h-full w-full max-w-[100%] object-contain sm:max-w-[60%]"
        />
        <h2 className="absolute top-[30%] ml-[3%] w-full transform text-center text-xl font-bold uppercase text-primaryYellow  lg:text-4xl">
          {i18n.t('list.sponsorTitle')}
        </h2>
      </div>
      <div className="mt-10">
        {data ? (
          <div className="flex flex-wrap  items-center justify-center">
            {data.map((project) => (
              <ProjectCard onOpenProjectModal={handleOpenProjectModal} project={project} key={project._id} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap  items-center justify-center ">
            {[1, 2, 3, 4, 5].map((item, i) => (
              <div
                key={i}
                alt="loading"
                className="mx-10 my-5 h-[150px] h-full w-full max-w-xs  animate-pulse rounded-3xl bg-gray-700"
              />
            ))}
          </div>
        )}
      </div>
    </Container>
  )
}

export default Projects
