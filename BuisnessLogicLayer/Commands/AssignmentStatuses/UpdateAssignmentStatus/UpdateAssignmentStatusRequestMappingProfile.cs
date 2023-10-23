using AutoMapper;
using BuisnessLogicLayer.Requests.AssignmentStatuses;

namespace BuisnessLogicLayer.Commands.AssignmentStatuses.UpdateAssignmentStatus;

public class UpdateAssignmentStatusRequestMappingProfile : Profile
{
    UpdateAssignmentStatusRequestMappingProfile()
    {
        CreateMap<UpdateAssignmentStatusRequest, AssignmentStatus>();
    }
}