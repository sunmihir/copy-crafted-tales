import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sparkles, Copy, Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FormData {
  brandName: string;
  platform: string;
  audience: string;
  language: string;
  tone: string;
  customPrompt: string;
}

interface ContentVariation {
  id: number;
  title: string;
  content: string;
  platform: string;
}

const ContentGenerator = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<FormData>({
    brandName: "",
    platform: "",
    audience: "",
    language: "",
    tone: "",
    customPrompt: "",
  });
  const [variations, setVariations] = useState<ContentVariation[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const platforms = ["WhatsApp", "Instagram", "Telegram", "YouTube", "Facebook", "Twitter", "LinkedIn"];
  const audiences = ["Friends", "Family", "Students", "Peers", "Followers", "Affiliaters", "Customers"];
  const languages = ["English", "Hindi", "Hinglish", "Spanish", "French"];
  const tones = ["Friendly", "Professional", "Quirky", "Humorous", "Casual", "Formal"];

  const generateVariations = () => {
    setIsGenerating(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newVariations: ContentVariation[] = [
        {
          id: 1,
          title: "Hook with Social Proof",
          content: `🚀 **${formData.brandName} is changing the game!**

${getPlatformSpecificContent(1)}

Ready to level up? Join thousands who've already made the switch! 

👆 Click here to get started with ${formData.brandName} today!`,
          platform: formData.platform,
        },
        {
          id: 2,
          title: "Problem-Solution Focus",
          content: `💡 **Tired of [common problem]?**

${formData.brandName} solves this with ${getPlatformSpecificContent(2)}

${getLanguageSpecificCTA()}`,
          platform: formData.platform,
        },
        {
          id: 3,
          title: "Benefit-Driven",
          content: `✨ **Transform your [relevant area] in just minutes!**

With ${formData.brandName}, you can:
${getPlatformSpecificContent(3)}

${getToneSpecificEnding()}`,
          platform: formData.platform,
        },
        {
          id: 4,
          title: "FOMO & Urgency",
          content: `🔥 **Limited time: ${formData.brandName} exclusive access!**

${getPlatformSpecificContent(4)}

Don't miss out - spaces are filling fast! ${getAudienceSpecificCTA()}`,
          platform: formData.platform,
        }
      ];
      
      setVariations(newVariations);
      setIsGenerating(false);
      
      toast({
        title: "Content Generated!",
        description: "4 unique variations are ready for your campaign.",
      });
    }, 2000);
  };

  const getPlatformSpecificContent = (variationId: number) => {
    const contents = {
      WhatsApp: [
        "Share this message with 3 friends who need to see this! 📱",
        "Perfect for our WhatsApp community - quick, effective, and personal.",
        "• Save time ⏰\n• Boost results 📈\n• Feel confident 💪",
        "Your friends are asking about this. Here's why it works:"
      ],
      Instagram: [
        "Double-tap if you agree! Stories highlight coming soon 📸",
        "This is the Instagram hack everyone's talking about.",
        "🎯 Instantly improve your feed\n📱 Easy to use\n✨ Professional results",
        "Tag 3 friends who need this in their life! Limited spots available."
      ],
      Facebook: [
        "Share this post to help your network succeed! 👥",
        "This Facebook-exclusive tip is exactly what you've been missing.",
        "✓ Proven results\n✓ Community support\n✓ Easy implementation",
        "Join the conversation - your thoughts matter! Comment below 👇"
      ]
    };
    
    const platformContent = contents[formData.platform as keyof typeof contents] || contents.Instagram;
    return platformContent[variationId - 1];
  };

  const getLanguageSpecificCTA = () => {
    const ctas = {
      Hindi: "अभी शुरू करें! यहाँ क्लिक करें 👆",
      Hinglish: "Bas ek click mein start karo! Kya wait kar rahe ho? 🚀",
      English: "Start your journey now - click the link! 🔗",
      Spanish: "¡Comienza ahora mismo! Haz clic aquí 👆",
      French: "Commencez maintenant! Cliquez ici 👆"
    };
    
    return ctas[formData.language as keyof typeof ctas] || ctas.English;
  };

  const getToneSpecificEnding = () => {
    const endings = {
      Friendly: "Can't wait to see your success story! 🌟",
      Professional: "Ready to take the next step in your journey?",
      Quirky: "Time to join the cool kids club! 😎 (Yes, we have cookies)",
      Humorous: "Warning: Side effects may include excessive success and happiness 😄",
      Casual: "Trust me, you'll thank yourself later! 🙌",
      Formal: "We invite you to experience the difference."
    };
    
    return endings[formData.tone as keyof typeof endings] || endings.Friendly;
  };

  const getAudienceSpecificCTA = () => {
    const ctas = {
      Friends: "You know I wouldn't share this if it wasn't amazing!",
      Family: "This is perfect for our family goals!",
      Students: "Student discount available - check it out!",
      Peers: "Let's grow together - join me!",
      Followers: "As promised, here's the exclusive access link!",
      Affiliaters: "Ready to earn? This converts like crazy!",
      Customers: "Valued customer exclusive - just for you!"
    };
    
    return ctas[formData.audience as keyof typeof ctas] || ctas.Followers;
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Copied!",
      description: "Content copied to clipboard.",
    });
  };

  const downloadAll = () => {
    const allContent = variations.map((v, i) => 
      `VARIATION ${i + 1}: ${v.title}\n${'='.repeat(40)}\n${v.content}\n\n`
    ).join('');
    
    const blob = new Blob([allContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.brandName}-content-variations.txt`;
    a.click();
    
    toast({
      title: "Downloaded!",
      description: "All variations saved to your device.",
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Content Variation Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Create 4 distinct, engaging content variations to promote your brand across different platforms
        </p>
      </div>

      {/* Form */}
      <Card className="bg-gradient-to-br from-card to-muted/50 border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Brand Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="brandName">Brand Name</Label>
              <Input
                id="brandName"
                placeholder="Enter your brand name"
                value={formData.brandName}
                onChange={(e) => setFormData({...formData, brandName: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Select value={formData.platform} onValueChange={(value) => setFormData({...formData, platform: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((platform) => (
                    <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audience">Audience</Label>
              <Select value={formData.audience} onValueChange={(value) => setFormData({...formData, audience: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select audience" />
                </SelectTrigger>
                <SelectContent>
                  {audiences.map((audience) => (
                    <SelectItem key={audience} value={audience}>{audience}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={formData.language} onValueChange={(value) => setFormData({...formData, language: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language} value={language}>{language}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tone">Tone</Label>
              <Select value={formData.tone} onValueChange={(value) => setFormData({...formData, tone: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="customPrompt">Extra Context (Optional)</Label>
            <Textarea
              id="customPrompt"
              placeholder="Add any specific requirements, key benefits, or additional context..."
              value={formData.customPrompt}
              onChange={(e) => setFormData({...formData, customPrompt: e.target.value})}
              rows={3}
            />
          </div>
          
          <div className="flex gap-4">
            <Button 
              onClick={generateVariations}
              disabled={!formData.brandName || !formData.platform || isGenerating}
              className="flex-1 bg-gradient-to-r from-primary to-primary-glow hover:shadow-lg transition-all duration-300"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate Variations
                </>
              )}
            </Button>
            
            {variations.length > 0 && (
              <Button variant="outline" onClick={downloadAll}>
                <Download className="h-4 w-4 mr-2" />
                Download All
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Generated Variations */}
      {variations.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-center">Generated Content Variations</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {variations.map((variation) => (
              <Card key={variation.id} className="bg-gradient-to-br from-card to-muted/30 border hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    {variation.title}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(variation.content)}
                      className="h-8 w-8 p-0"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap text-sm font-mono">
                      {variation.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;