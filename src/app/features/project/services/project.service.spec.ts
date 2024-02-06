import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { ProjectsResponse } from '../my-projects/models/projects-response';

const mockProjects: ProjectsResponse = {
  status: 'minus qui vel',
  data: [
    {
      _id: 'ut',
      name: 'Johnson Schmidt',
      members: [
        'Qui iusto in repudiandae quia sapiente oque ut.',
        'Sunt et aut cum cumque. At earumque recusandae.\n \rSoluta error deleniti soluta porro quo. Voluptatem optio quo ipsum et ducimus. Corrupti et et.',
        'Similique aperiam non id atque remaboriosam.\n \rNemo voluptas tenetur. Non impedit sed. Sed omnis placeat recusandae cupiditate velit in. Est reprehenderit voluptas cum officiis asperiores beatae qui nesciunt. Non dolores nisi et fuga possimus.',
      ],
      owner:
        'Et et ipsa corrupti nihil ipsam molestiae quae consequatur sint.\nFacere sed quo excepturi.',
      icon: 'Voluptatuuo. Repudiandae sequi animi rep earum et. Aut voluptates sint odio qui sint. Earum consequatur perspiciatis fuga rem.\n \rQui amet cupiditate facere enim voluptate. Illo eum enim dolores at. Dignissimos molestias quae et autem et. Omnis perferendis tempore harum ut molestiae. Beatae at eum ducimus laudantium ut.',
    },
    {
      _id: 'Est iusto similique dolorum exercitationem consequatur quia et consequatur et.',
      name: 'Miss Pamela Goldner',
      members: [
        'Enim velit quia facere. enim alias.',
        'Voluptates optio et. Architecto lEt tenetur earum. Aut eius possimus illum mollitia molestiae numquam vel.',
      ],
      owner: 'omnis fuga quis',
      icon: 'Labore quia error.',
    },
    {
      _id: 'Vel atque a.\nQuia ut atque odit.',
      name: 'Mr. Tre Spencer',
      members: ['Minus  et fugiat et.\nVoluptatibus quas aut in.', 'numquam'],
      owner: 'Est fuga culpt ratione quam sit culpa aut et.\nAut officiis eos.',
      __v: 51485,
    },
    {
      _id: 'Omnis molestiae sint totam quibusdam harum ut reiciendis inventore. Voluptas animi illum provident deserunt. Exercitationem eligendi odit. Ipsam et officiis et voluptas molestiae error eum sequi. Sed dolorem similique et est dolores.',
      name: "Curtis O'Kon",
      members: [
        'Facere tate incidunt excepturi fuga id eos accusamus vel. Mollitia quisquam qui vel.',
        'Repudiandae vel repiosam sed aliquam. Et molestiae facere et velit et. Libero et perferendis tempora labore praesentium est ducimus. Qui sit non omnis officiis veniam optio.\n \rDistinctio maiores sed voluptatem asperiores ipsam. Veritatis totam commodi et exercitationem dolorem suscipit et quo veniam. Sint tenetur autem laborum id quaerat provident voluptas.\n \rDolores eaque incidunt commodi accusamus tempore eligendi debitis architecto. Dolor at consectetur cum quae eaque totam vel quae. Impedit repellendus amet ab aut illum molestias quia in fugit.',
      ],
      owner:
        'Rem similique recusadantium minus aut veniam.\n \rRerum voluptatem delectus a voluptatem quia quisquam omnis temporibus. Delectus quo adipisci quae tempore id cum. Libero sit qui tempora amet a fugiat. Sunt error impedit nesciunt quod ea repellendus aut. Occaecati mollitia expedita quos.\n \rDolorum iure facilis. Reprehenderit quam aliquid eos nihil nobis cupiditate. Officiis molestiae omnis repudiandae repellendus sunt consectetur perferendis deleniti. Amet assumenda aut impedit ut.',
      __v: 14632,
    },
    {
      _id: 'Id sunt debitis d repellat nihil consequatur vel aut nam provident.',
      name: 'Audrey Schamberger',
      members: [
        'Occaecati qui doloribus neque. Inventore blanditiis eum et quis. Et iste corporis cupiditate accusantium quibusdam.',
        'ut',
      ],
      owner:
        'Aliquam ut qui nihil maxime nesciunt minima deleniti ipsum reprehenderit. Aliquam sint ea.',
      description:
        'Vel rerum consectetur a atro iste vero dolorem. Autem nemo sint amet.',
      icon: 'Est sequi alias rerum aut atque molestiae.\nMollitia iusto necessitatibus.',
    },
    {
      _id: 'Consequatur rerum voluptatem est quas. Inventore reiciendis voluptas nulla quis nam. Temporibus distinctio tenetur magnam.',
      name: 'Tyrel Kreiger',
      members: [
        'Quasi eaque delevident odit quidem quod. Illum quis omnis totam repellendus est facilis enim consequatur.',
        'Aut temporibus assumenedit ullam.',
      ],
      owner: 'at',
      icon: 'Quia culpa ea sed explicabo d quia aut qui.',
    },
  ],
};

describe('ProjectService', () => {
  let projectService: ProjectService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProjectService],
    });

    projectService = TestBed.inject(ProjectService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Should retrieve all projects', () => {
    projectService.getProjects$().subscribe((data) => {
      expect(data).withContext('No data returned from service').toBeTruthy();
      expect(data.data.length)
        .withContext('Data is not the correct size')
        .toBe(6);
    });
    const req = httpTestingController.expectOne(
      environment.API_URL + '/api/projects'
    );
    expect(req.request.method)
      .withContext('Http method is not GET')
      .toEqual('GET');

    req.flush(mockProjects);
  });

  it('Should retrieve one project', () => {
    projectService.getProject$('ut').subscribe((data) => {
      expect(data).withContext('No data returned from service').toBeTruthy();
      expect(data.data._id).withContext('Incorrect data retrieved').toBe('ut');
    });

    const req = httpTestingController.expectOne(
      environment.API_URL + '/api/projects/ut'
    );
    expect(req.request.method)
      .withContext('Http method is not GET')
      .toEqual('GET');

    req.flush({ status: 'some', data: mockProjects.data[0] });
  });

  it('Should handle the failed request correctly', () => {
    projectService.getProject$('ut').subscribe({
      next: (data) => {
        fail('the get project operation should have failed');
      },
      error: (error) => {
        expect(error.status).toBe(500);
      },
    });

    const req = httpTestingController.expectOne(
      environment.API_URL + '/api/projects/ut'
    );
    expect(req.request.method)
      .withContext('Http method is not GET')
      .toEqual('GET');

    req.flush('get project failed', {
      status: 500,
      statusText: 'Internal server error',
    });
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
