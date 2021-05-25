using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System.IO;
using System.Threading.Tasks;

namespace Kongres.Api.Infrastructure
{
    public class FileManager : IFileManager
    {
        private readonly string _directoryPath;

        public FileManager(IWebHostEnvironment env)
        {
            _directoryPath = $"{env.ContentRootPath}/Files";
        }

        public async Task<string> SaveFileAsync(IFormFile file)
        {
            if (file == null)
                return null;

            // get file's extension
            var mime = file.FileName.Split(".")[^1];
            // randomize fileName
            var fileName = $"{Path.GetRandomFileName()}.{mime}";
            var savePath = Path.Combine(_directoryPath, fileName);

            await using var fileStream = new FileStream(savePath, FileMode.Create, FileAccess.Write);
            await file.CopyToAsync(fileStream);

            return fileName;
        }

        public Stream GetStreamOfFile(string fileName)
        {
            var filePath = Path.Combine(_directoryPath, fileName);
            return new FileStream(filePath, FileMode.Open, FileAccess.Read);
        }

        public async Task<string> GetBase64FileAsync(string fileName)
        {
            var filePath = Path.Combine(_directoryPath, fileName);
            var file = await File.ReadAllBytesAsync(filePath);
            return Convert.ToBase64String(file);
        }
    }
}
