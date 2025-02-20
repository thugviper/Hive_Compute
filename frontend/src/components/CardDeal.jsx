import React from 'react'
import { card } from '../assets'
import RequesterButton from './RequesterButton';
import styles, { layout } from '../style'
import VideoComponent from "./VideoComp";

const CardDeal = () => {
  return (
    <section id='product' className={layout.section}>
      <div className={layout.sectionInfo}>
      {/* <h2 className={styles.heading2}>Request</h2> <br className='sm:block hidden'/><h2 className={`${styles.heading2} ${styles.gradient}`} */}
      <h2 className={styles.heading2}>Request</h2><h2 className={`${styles.heading2} ${styles.gradient}`}
        > Compute: </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          (result will be shown here...)
        </p>
        {/* <Button styles='mt-10'/> */}
        <RequesterButton />
      </div>
      <div className={layout.sectionImg}>
      </div>
      <div>  
      <VideoComponent />
      </div>
    </section>
  )
}

export default CardDeal
