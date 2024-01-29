// export const environment = {
//   ROOT_URL: 'http://localhost:8080/api/v1',
//   SIGN_IN_URL: 'http://localhost:8080/api/v1/auth/sign-in',
//   LESSONS_URL: 'http://localhost:8080/api/v1/lessons',
//   TOKEN_KEY: 'jwt',
//   EXP_DATE_KEY: 'expiresIn',
// }

export const environment = {
  ROOT_URL: 'http://localhost:4200/api/v1',
  SIGN_IN_URL: 'http://localhost:4200/api/v1/auth/sign-in',
  STUDENT_REGISTRATION_URL: 'http://localhost:4200/api/v1/auth/sign-up/student',
  STUDENT_REGISTRATION_OPTIONS_URL: 'http://localhost:4200/api/v1/auth/sign-up/student/options',
  TEACHER_REGISTRATION_URL: 'http://localhost:4200/api/v1/auth/sign-up/teacher',
  LESSONS_URL: 'http://localhost:4200/api/v1/lessons',
  LESSONS_OPTIONS_URL: 'http://localhost:4200/api/v1/lessons/options',
  LESSON_PROGRESS_URL: 'http://localhost:4200/api/v1/progress',
  COURSES_URL: 'http://localhost:4200/api/v1/courses',
  OWNED_COURSES_URL: 'http://localhost:4200/api/v1/courses/own',
  STREAM_ENROLLMENT_URL: 'http://localhost:4200/api/v1/enrollments/stream',
  GROUP_ENROLLMENT_URL: 'http://localhost:4200/api/v1/enrollments/group',
  STUDENT_ENROLLMENT_URL: 'http://localhost:4200/api/v1/enrollments/student',
  ENROLLMENT_OPTIONS_URL: 'http://localhost:4200/api/v1/enrollments/options',
  TOKEN_KEY: 'jwt',
  EXP_DATE_KEY: 'expiresIn',
  CLIENT_DOMAIN: 'http://localhost:4200',
  BACKEND_DOMAIN: 'http://localhost:8080',
  ROLE_ADMIN: 'ROLE_ADMIN',
  ROLE_TEACHER: 'ROLE_TEACHER',
  ROLE_STUDENT: 'ROLE_STUDENT',
}

