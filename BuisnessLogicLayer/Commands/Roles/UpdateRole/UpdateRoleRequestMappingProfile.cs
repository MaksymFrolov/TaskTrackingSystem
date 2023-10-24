using AutoMapper;
using BuisnessLogicLayer.Requests.Roles;

namespace BuisnessLogicLayer.Commands.Roles.UpdateRole;

public class UpdateRoleRequestMappingProfile : Profile
{
    UpdateRoleRequestMappingProfile()
    {
        CreateMap<UpdateRoleRequest, Role>();
    }
}