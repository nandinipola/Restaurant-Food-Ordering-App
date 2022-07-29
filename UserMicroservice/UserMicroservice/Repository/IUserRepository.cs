using BackendAPI;
using BackendAPI.Data;
using BackendAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace UserMicroservice.Repository
{
    public interface IUserRepository
    {

        Task<List<Users>> GetUserByIdAsync(string ID);
        Task<ActionResult<string>> AddUserAsync(UserDto UserData);
        

    }
}
