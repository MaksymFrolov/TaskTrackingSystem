using AutoMapper;
using BuisnessLogicLayer.Requests.ProjectStatuses;

namespace BuisnessLogicLayer.Commands.ProjectStatuses.UpdateProjectStatus;

public class UpdateProjectStatusRequestMappingProfile : Profile
{
    UpdateProjectStatusRequestMappingProfile()
    {
        CreateMap<UpdateProjectStatusRequest, ProjectStatus>();
    }
}