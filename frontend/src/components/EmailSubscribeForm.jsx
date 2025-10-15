import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';
import { subscribeEmail } from '../services/api';
import { Loader2, Mail, CheckCircle2 } from 'lucide-react';

export default function EmailSubscribeForm({ className = '' }) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      toast.error('Please enter your email address');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const result = await subscribeEmail(email);
      
      if (result.success) {
        setIsSubscribed(true);
        toast.success(result.message, {
          description: result.alreadySubscribed 
            ? "You're already on our waitlist!" 
            : "We'll notify you when we launch",
          duration: 5000,
        });
        
        if (!result.alreadySubscribed) {
          setEmail('');
        }
        
        // Reset the subscribed state after 3 seconds
        setTimeout(() => setIsSubscribed(false), 3000);
      } else {
        toast.error('Subscription failed', {
          description: result.message,
        });
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 h-12 text-base"
              disabled={isLoading || isSubscribed}
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || isSubscribed}
            className="h-12 px-8 min-w-[140px]"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Subscribing...
              </>
            ) : isSubscribed ? (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Subscribed!
              </>
            ) : (
              'Join Waitlist'
            )}
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground text-center">
          🔒 We'll notify you when we launch. No spam, ever.
        </p>
      </form>
    </div>
  );
}
