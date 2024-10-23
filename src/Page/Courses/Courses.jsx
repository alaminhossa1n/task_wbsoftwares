import CoursesCard from "../../components/CoursesCard";
import useCourses from "../../Hooks/useCourses";

const Courses = () => {
  const [courses] = useCourses();

  return (
    <div className="m-mt_16px">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses?.length > 0 ? (
          courses.map((course, index) => (
            <CoursesCard key={index} course={course} />
          ))
        ) : (
          <div className="flex items-center justify-center min-h-screen">
            <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
