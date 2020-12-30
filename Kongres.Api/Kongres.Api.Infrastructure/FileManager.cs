using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Hosting;

namespace Kongres.Api.Infrastructure
{
    public class FileManager : IFileManager
    {
        private readonly string _filePath;

        public FileManager(IWebHostEnvironment env)
        {
            _filePath = $"{env.ContentRootPath}/Files";
        }

        public async Task<string> SaveFile(IFormFile file)
        {
            if (file == null)
                return null;

            // get file's extension
            var mime = file.FileName.Split(".")[^1];
            // randomize fileName
            var fileName = $"{Path.GetRandomFileName()}.{mime}";
            var savePath = Path.Combine(_filePath, fileName);

            await using var fileStream = new FileStream(savePath, FileMode.Create, FileAccess.Write);
            await file.CopyToAsync(fileStream);

            return fileName;
        }
    }
}
