import { PerformanceInterval } from "../../core/services/REM-api-service";

export enum IInputEnum{
  Integer ,
  Float ,
  String ,
  Date ,
  Boolean ,
  MultiSelect ,
  SingleSelect
}

export enum SortingOptions{
    NewestDate,
    OldestDate,
    HighestPrice,
    LowestPrice,
    LargestArea,
    SmallestArea
}

export enum PropertyStatus
{
    Available,
    Pending,
    UnderNegotiation,
    Sold,
    Rejected,
    Unavailable,
}

export enum AdStatus {
  Upcoming,
  Active,
  Pause,
  Expired,
  Stopped
}

export enum AdPlacement {
  BannerAd ,
  NativeAd,
 
}

export enum UserTypeTargeting {
  Everyone ,
  MarketersOnly ,
  NonMarketersOnly,

}

export enum AdsSortingOptions
{
    StartDate,
    EndDate,
    // Views,
    // Clicks
}

export enum DiscountType
{
    Percentage,
    Fixed
}
export enum PackageType
{
    Free,
    Paid
}

export enum SortOrder
{
    Ascending,
    Descending 
}

export enum GroupStatus
{
    UnderNegotiation,
    Sold,
    Closed
}


export const ACTIVE_STATUS = [
  { label: 'Active', labelAr: 'نشط', value: true },
  { label: 'InActive', labelAr: 'غير نشط', value: false },
];

export const Role_STATUS = [
  { label: 'Marketer', labelAr: 'مسوق', value: 'Marketer' },
  { label: 'Non Marketer', labelAr: 'غير مسوق', value: 'Non_Marketer' }]
  
  export const Alphabet_STATUS = [
    { label: 'a-z', labelAr: 'أ-ي', value: true },
    { label: 'z-a', labelAr: 'ي-أ', value: false },
  ];
  
  export const CreatedOn_STATUS = [
    { label: 'Newest to Oldest', labelAr: 'الأحدث إلى الأقدم', value: true },
    { label: 'Oldest to Newest', labelAr: 'الأقدم إلى الأحدث', value: false },
  ];
  
  export const OffersCount_STATUS = [
    { label: 'Descending', labelAr: 'تنازلي', value: true },
    { label: 'Ascending', labelAr: 'تصاعدي', value: false },
  ];

   
      export const InputEnumList = [
        { label: 'Integer', labelAr: 'عدد صحيح', value: IInputEnum.Integer },
        { label: 'Float', labelAr: 'عدد عشري', value: IInputEnum.Float },
        { label: 'String', labelAr: 'نص', value: IInputEnum.String },
        { label: 'Date', labelAr: 'تاريخ', value: IInputEnum.Date },
        { label: 'Boolean', labelAr: 'قيمة منطقية', value: IInputEnum.Boolean },
        { label: 'MultiSelect', labelAr: 'اختيار متعدد', value: IInputEnum.MultiSelect },
        { label: 'SingleSelect', labelAr: 'اختيار واحد', value: IInputEnum.SingleSelect },
    ];

    export const STATUS = [
      { label: 'pending', labelAr: 'قيد الانتظار', value: PropertyStatus.Pending },
      { label: 'rejected', labelAr: 'مرفوض', value: PropertyStatus.Rejected },
    ];
    
    export const SortingList = [
      { label: 'Newest Date', labelAr: 'أحدث تاريخ', value: 0 },
      { label: 'Oldest Date', labelAr: 'أقدم تاريخ', value: 1 },
      { label: 'Highest Price', labelAr: 'أعلى سعر', value: 2 },
      { label: 'Lowest Price', labelAr: 'أقل سعر', value: 3 },
      { label: 'Largest Area', labelAr: 'أكبر مساحة', value: 4 },
      { label: 'Smallest Area', labelAr: 'أصغر مساحة', value: 5 },
    ];


        
    export const PUBLISHED_STATUS = [
      { label: 'Active', labelAr: 'نشط', value: PropertyStatus.Available },
      { label: 'Under Negotiation', labelAr: 'تحت التفاوض', value: PropertyStatus.UnderNegotiation },
      { label: 'Sold', labelAr: 'مباع', value: PropertyStatus.Sold },
      { label: 'Inactive', labelAr: 'غير نشط', value: PropertyStatus.Unavailable },
    ];

export const AllSTATUS = [
  { label: 'Active', labelAr: 'نشط', value: PropertyStatus.Available },
  { label: 'Pending', labelAr: 'معلق', value: PropertyStatus.Pending },
  { label: 'Under Negotiation', labelAr: 'قيد التفاوض', value: PropertyStatus.UnderNegotiation },
  { label: 'Sold', labelAr: 'مباع', value: PropertyStatus.Sold },
  { label: 'Rejected', labelAr: 'مرفوض', value: PropertyStatus.Rejected },
  { label: 'Inactive', labelAr: 'غير نشط', value: PropertyStatus.Unavailable },
];

export const PENDING_STATUS = [
  { label: 'Pending', labelAr: 'قيد الانتظار', value: false },
  { label: 'Resolved', labelAr: 'تم الحل', value: true },
];

export const Oldest = [
  { label: 'Newest First', labelAr: 'الأحدث أولاً', value: false },
  { label: 'Oldest First', labelAr: 'الأقدم أولاً', value: true },
];

export const AllAdStatus = [
  { label: 'Upcoming', labelAr: 'قادم', value: AdStatus.Upcoming },
  { label: 'Active', labelAr: 'نشط', value: AdStatus.Active },
  { label: 'Pause', labelAr: " ايقاف مؤقت", value: AdStatus.Pause },
  { label: 'Expired', labelAr: 'منتهي الصلاحية', value: AdStatus.Expired },
  { label: 'Stopped', labelAr: 'متوقف', value: AdStatus.Stopped },
];

export const editAdStatus = [
  { label: 'Active', labelAr: 'نشط', value: AdStatus.Active },
  { label: 'Paused', labelAr: 'ايقاف مؤقت', value: AdStatus.Pause },
  { label: 'Stopped', labelAr: 'متوقف', value: AdStatus.Stopped },
];

export const AdPlacementStatus = [
  { label: 'BannerAd', labelAr: 'إعلان بانر', value: AdPlacement.BannerAd },
  { label: 'NativeAd', labelAr: 'إعلان مدمج', value: AdPlacement.NativeAd },
];

export const UserTypeTargetingOptions = [
  { label: 'Marketers Only', labelAr: 'المسوقين فقط', value: UserTypeTargeting.MarketersOnly },
  { label: 'Non-Marketers Only', labelAr: 'غير المسوقين فقط', value: UserTypeTargeting.NonMarketersOnly },
  { label: 'Everyone', labelAr: 'الجميع', value: UserTypeTargeting.Everyone },
];

export const ADS_SORTING = [
  { label: 'Start Date', labelAr: 'تاريخ البدء', value: AdsSortingOptions.StartDate },
  { label: 'End Date', labelAr: 'تاريخ الانتهاء', value: AdsSortingOptions.EndDate },
  // { label: 'Views', labelAr: 'المشاهدات', value: AdsSortingOptions.Views },
  // { label: 'Clicks', labelAr: 'النقرات', value: AdsSortingOptions.Clicks },
];

export const Stopped_Status = [
  { label: 'PAUSE', labelAr: 'ايقاف مؤقت', value:AdStatus.Pause  }
  ,
  { label: 'STOPPED', labelAr: 'متوقف', value: AdStatus.Stopped },
];

export const package_Type = [
  { label: 'Free', labelAr: 'مجاني', value: PackageType.Free },
  { label: 'Paid', labelAr: 'مدفوع', value: PackageType.Paid },
];

export const performanceIntervals: { label: string; labelAr: string; value: PerformanceInterval }[] = [
  { label: 'Days', labelAr: 'أيام', value: 0 },
  { label: 'Months', labelAr: 'أشهر', value: 1 },
  { label: 'Years', labelAr: 'سنوات', value: 2 }
];

export const DISCOUNT_TYPES = [
  { label: 'Percentage', labelAr: 'نسبة مئوية', value: DiscountType.Percentage },
  { label: 'Fixed', labelAr: 'مبلغ ثابت', value: DiscountType.Fixed }
];

export const Renew_STATUS = [
  { label: 'Enable', labelAr: 'تمكين', value: true },  
  { label: 'Disable', labelAr: 'تعطيل', value: false },
];

export const sortOrderOptions = [
  { label: 'Ascending', labelAr: 'تصاعدي', value: SortOrder.Ascending },
  { label: 'Descending', labelAr: 'تنازلي', value: SortOrder.Descending },
];

export const GROUP_STATUS = [
  { label: 'Under Negotiation', labelAr: 'تحت التفاوض', value: GroupStatus.UnderNegotiation },
  { label: 'Sold', labelAr: 'مباع', value: GroupStatus.Sold },
  { label: 'Closed', labelAr: 'مغلق', value: GroupStatus.Closed }
];