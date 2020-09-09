import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Spin from 'arui-feather/spin';
import './style.scss'

const SpinnerLayout = ({ breakHandler = null }) => {
  const loading = useSelector(({ loading }) => loading)

  return loading ? (
    <div className="spinner-layout">
      <Spin size="xl" className="spinner-layout__spinner" visible={true} />
      {breakHandler && (
        <button
          onClick={breakHandler}
          type="button"
        >
          Отмена
        </button>
      )}
    </div>
  ) : null
}

SpinnerLayout.propTypes = {
  breakHandler: PropTypes.func,
}

export default SpinnerLayout
