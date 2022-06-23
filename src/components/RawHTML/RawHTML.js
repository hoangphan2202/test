import React from 'react'
import PropTypes from 'prop-types'

export const RawHTML = ({ children, tag = 'div', nl2br = true, ...rest }) =>
  React.createElement(tag, {
    dangerouslySetInnerHTML: {
      __html: nl2br ? children && children.replace(/\n/g, '<br />') : children,
    },
    ...rest,
  })

RawHTML.propTypes = {
  children: PropTypes.string,
  nl2br: PropTypes.bool,
  tag: PropTypes.string,
}
