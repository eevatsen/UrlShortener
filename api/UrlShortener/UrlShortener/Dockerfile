FROM --platform=linux/amd64 mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

COPY ["UrlShortener.csproj", "."]
# Відновлюємо залежності
RUN dotnet restore "./UrlShortener.csproj"

COPY . .
# Збираємо проєкт
WORKDIR "/src/."
RUN dotnet build "UrlShortener.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "UrlShortener.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM --platform=linux/amd64 mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=publish /app/publish .
EXPOSE 8080
ENTRYPOINT ["dotnet", "UrlShortener.dll"]