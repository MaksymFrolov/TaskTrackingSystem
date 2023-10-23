using AutoMapper;
using BuisnessLogicLayer.Requests.Projects;

namespace BuisnessLogicLayer.Commands.Projects.UpdateProject;

public class UpdateProjectRequestMappingProfile : Profile
{
    UpdateProjectRequestMappingProfile()
    {
        CreateMap<UpdateProjectRequest, Project>();
    }
}