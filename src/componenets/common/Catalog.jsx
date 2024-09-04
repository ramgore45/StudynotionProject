
import { Footer } from './Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../../Services/apiconnector'
import { CourseSlider } from '../core/Catalog/CourseSlider'
import { COurse_Card } from '../core/Catalog/COurse_Card'
import { getCatalogPageDetails } from '../../Services/operations/pageAndComponenetDetails'
import { categories } from '../../Services/apis'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Error } from "../../pages/Error"

export const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const { catalogName } = useParams()
    console.log(catalogName.split(" ").join("-").toLowerCase())
    const [active, setActive] = useState(1)
    const [catalogPageData,setCatalogPageData] = useState(null)
    const [categoryId,setCategoryId] = useState("")

    useEffect(()=>{
        console.log('Catalog courses fetching start')
        const getCategories = async()=>{
                try{
                    const res = await apiConnector("GET", categories.CATEGORIES_API)
                    console.log('CATEGORY IDDDD', res.data.allCategorys.filter((item)=>item.name.split(" ").join("-").toLowerCase()==catalogName)[0]?._id)
                    // const category_id = res?.data?.data?.filter((ct)=>ct.name.split(" ").join("-").toLowerCase()=== catalogName)[0]._id
                    
                    const category_id = res.data.allCategorys.filter((item)=>item.name.split(" ").join("-").toLowerCase()===catalogName)[0]?._id
                    setCategoryId(category_id)
                }
                catch(error){
                    console.log(error)
                }
            }
        getCategories()
        
    }, [])

    console.log('categoryID',categoryId)
    

    useEffect(()=>{
        console.log('fetching category details Start')
        if (categoryId) {
            console.log(categoryId)
            ;(async () => {
              try {
                const res = await getCatalogPageDetails(categoryId)
                setCatalogPageData(res)
              } catch (error) {
                console.log(error)
              }
            })()
          }
    },[categoryId])

    console.log('Catalog apge Data', catalogPageData)

    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }

  return (
    <>
      {/* Hero Section */}
      <div className=" box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section 1 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Populer
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          {
                    <CourseSlider
                        courses={catalogPageData?.data?.selectedCategory?.courses}
                    />
          }
        </div>
      </div>
      {/* Section 2 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading text-richblack-500">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading text-richblack-500">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <COurse_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
};
