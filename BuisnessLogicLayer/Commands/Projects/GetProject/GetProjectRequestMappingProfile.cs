using AutoMapper;
using BuisnessLogicLayer.Responses.Projects;

namespace BuisnessLogicLayer.Commands.Projects.GetProject;

public class GetProjectRequestMappingProfile : Profile
{
    GetProjectRequestMappingProfile()
    {
        CreateMap<Project, GetProjectResponse>()
            .ForMember(t => t.StatusName, t => t.MapFrom(n => n.Status.Name))
            .ForMember(t => t.TaskIds, t => t.MapFrom(m => m.Tasks.Select(n => n.Id)));

    }
}