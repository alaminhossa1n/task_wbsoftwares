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
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default Courses;
