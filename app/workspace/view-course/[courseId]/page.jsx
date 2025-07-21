// import { useParams } from 'next/navigation'
import EditCourse from '../../edit-course/[courseId]/page'

const ViewCourse = () => {
	// const { courseId } = useParams()
	return (
		<div>
			<EditCourse viewCourse={true} />
		</div>
	)
}

export default ViewCourse
