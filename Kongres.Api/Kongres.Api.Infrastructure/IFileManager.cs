﻿using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure
{
    public interface IFileManager
    {
        Task<string> SaveFileAsync(IFormFile file);
        Stream ReadFile(string fileName);
    }
}
