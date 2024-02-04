import {Routes} from "@angular/router";
import {RoleGuard} from "../../services/guards/role.guard";
import {environment} from "../../../environments/environment.dev";
import {TeacherLayoutComponent} from "./teacher-layout/teacher-layout.component";
import {TeacherHomePageComponent} from "./teacher-home-page/teacher-home-page.component";
import {EnrollmentFormComponent} from "./enrollment-form/enrollment-form.component";
import {CreateCourseFormComponent} from "./create-course-form/create-course-form.component";
import {OwnedCoursesComponent} from "./owned-courses/owned-courses.component";
import {CreateLessonFormComponent} from "./create-lesson-form/create-lesson-form.component";
import {CoursePageComponent} from "./course-page/course-page.component";
import {CreateStreamFormComponent} from "./create-stream-form/create-stream-form.component";
import {CreateGroupFormComponent} from "./create-group-form/create-group-form.component";
import {GroupProgressPageComponent} from "./group-progress-page/group-progress-page.component";
import {
  StudentDetailedProgressPageComponent
} from "./student-detailed-progress-page/student-detailed-progress-page.component";
import {TeacherLessonPageComponent} from "./teacher-lesson-page/teacher-lesson-page.component";

export const teacherRoutes: Routes = [
  {
    path: '', component: TeacherLayoutComponent,
    canActivate: [RoleGuard],
    canActivateChild: [RoleGuard],
    data: {roles: [environment.ROLE_TEACHER]}, children: [
      {path: '', redirectTo: '/teacher/dashboard', pathMatch: 'full'},
      {path: 'dashboard', component: TeacherHomePageComponent, data: {breadcrumb: 'Профиль'}},
      {path: 'enrollments/new', component: EnrollmentFormComponent, data: {breadcrumb: 'Зачислить'}},
      {path: 'courses/new', component: CreateCourseFormComponent, data: {breadcrumb: 'Добавить курс'}},
      {path: 'lessons/new', component: CreateLessonFormComponent, data: {breadcrumb: 'Добавить урок'}},
      {path: 'streams/new', component: CreateStreamFormComponent, data: {breadcrumb: 'Добавить поток'}},
      {path: 'groups/new', component: CreateGroupFormComponent, data: {breadcrumb: 'Добавить группу'}},

      {
        path: 'courses',
        data: {breadcrumb: 'Мои курсы'}, children: [
          {
            path: '',
            component: OwnedCoursesComponent,
          },

          {
            path: ':id',
            data: {breadcrumb: 'Курс'}, children: [
              {
                path: '',
                component: CoursePageComponent,
              },

              {
                path: 'lessons/:lessonId',
                data: {breadcrumb: 'Урок'}, children: [
                  {
                    path: '',
                    component: TeacherLessonPageComponent,
                    data: {breadcrumb: 'Урок'}
                  },

                  {
                    path: ':groupId',
                    data: {breadcrumb: 'Прогресс группы'},
                    children: [
                      {
                        path: '',
                        component: GroupProgressPageComponent,
                      },
                      {
                        path: ':studentId',
                        component: StudentDetailedProgressPageComponent,
                        data: {breadcrumb: 'Детальный отчёт'}
                      },
                    ]
                  },
                ]
              },
            ]
          },
        ]
      },
    ]
  },
];
