using AutoMapper;
using Luftborn.Application.Helper;

namespace Luftborn.Application.Mapping;

public class MappingProfileBase : Profile
{
    protected static bool IsArabic => CultureHelper.CurrentLanguage == "ar";

    public MappingProfileBase()
    {
        SourceMemberNamingConvention = new LowerUnderscoreNamingConvention();
        DestinationMemberNamingConvention = new PascalCaseNamingConvention();
        ReplaceMemberName("_", "");
    }
}
