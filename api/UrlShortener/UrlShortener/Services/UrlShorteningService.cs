public class UrlShorteningService
{
    private const string Alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    private readonly int Base = Alphabet.Length;

    public string Encode(int id)
    {
        if (id == 0) return Alphabet[0].ToString();

        var s = string.Empty;
        while (id > 0)
        {
            s += Alphabet[id % Base];
            id /= Base;
        }

        return string.Join(string.Empty, s.Reverse());
    }
}