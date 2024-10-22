import { useQuery } from "@tanstack/react-query";

const useCourses = () => {
  const {
    data = {},
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["course"],
    queryFn: async () => {
      const res = await fetch(
        "https://itderbd.nextwebservice.com/api/get-course-list"
      );
      return res.json();
    },
  });

  const courses = data.courseData;

  return [courses, refetch, loading];
};

export default useCourses;
