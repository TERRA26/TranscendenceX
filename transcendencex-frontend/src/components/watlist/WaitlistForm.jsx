import { useState } from 'react';
import Button from '../ui/Button';
import Input from '../ui/Input';

export default function WaitlistForm() {
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        organization: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for future backend integration
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-md mx-auto">
            <div>
                <Input
                    type="text"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                />
            </div>

            <div>
                <Input
                    type="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                />
            </div>

            <div>
                <Input
                    type="text"
                    placeholder="Organization"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                />
            </div>

            <Button type="submit" className="w-full">
                Join Waitlist
            </Button>
        </form>
    );
}