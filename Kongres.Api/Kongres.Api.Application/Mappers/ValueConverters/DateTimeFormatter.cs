using AutoMapper;
using System;

namespace Kongres.Api.Application.Mappers.ValueConverters
{
    public class DateTimeFormatter : IValueConverter<DateTime, string>
    {
        public string Convert(DateTime sourceMember, ResolutionContext context)
            => sourceMember.ToString("g");
    }
}
